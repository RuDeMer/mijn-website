<?php
// =====================================================================
//  Rommelhotel: status-API voor de werkplaats
//  GET  -> geeft de huidige stand terug
//  POST -> zet de stand: {"stand": "open" | "admin_only" | "closed", "bericht": "..."}
//  Alleen met de juiste sleutel (Authorization: Bearer <sleutel>) en vanaf je eigen site.
// =====================================================================
declare(strict_types=1);

// Waar de stand staat. Laat nginx dit bestand nooit direct uitgeven (zie de uitleg).
const STATUS_BESTAND = __DIR__ . '/hotel_status.json';
// De geheime sleutel staat één map hoger, buiten de map die het internet ziet (/root/habbo/www/status_api_sleutel.txt).
define('SLEUTEL_BESTAND', dirname(__DIR__) . '/status_api_sleutel.txt');
const HERKOMSTEN = ['https://rubensrommelhoekje.nl', 'https://www.rubensrommelhoekje.nl'];
const STANDEN = ['open', 'admin_only', 'closed'];
const MAX_FOUT = 10;          // foute pogingen per IP-adres...
const FOUT_VENSTER = 900;     // ...binnen 15 minuten, daarna een kwartier geblokkeerd

function antwoord(int $code, array $data): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------- CORS: alleen je eigen site mag dit gebruiken
$herkomst = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($herkomst, HERKOMSTEN, true)) {
    header('Access-Control-Allow-Origin: ' . $herkomst);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
    header('Access-Control-Max-Age: 600');
}
header('Vary: Origin');
$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($methode === 'OPTIONS') { http_response_code(204); exit; }
if ($herkomst !== '' && !in_array($herkomst, HERKOMSTEN, true)) antwoord(403, ['fout' => 'Deze site mag het hotel niet besturen.']);
if (!in_array($methode, ['GET', 'POST'], true)) antwoord(405, ['fout' => 'Alleen GET en POST.']);

// ---------- blokkade na te veel foute pogingen
$ip = $_SERVER['REMOTE_ADDR'] ?? 'onbekend';
$foutBestand = sys_get_temp_dir() . '/rommelhotel-api-fouten.json';
$fouten = is_file($foutBestand) ? (json_decode((string) @file_get_contents($foutBestand), true) ?: []) : [];
$nu = time();
foreach ($fouten as $k => $lijst) { $fouten[$k] = array_values(array_filter((array) $lijst, fn($t) => $nu - (int) $t < FOUT_VENSTER)); if (!$fouten[$k]) unset($fouten[$k]); }
if (count($fouten[$ip] ?? []) >= MAX_FOUT) antwoord(429, ['fout' => 'Te veel foute pogingen. Probeer het over een kwartier opnieuw.']);

// ---------- de sleutel controleren
$sleutel = is_file(SLEUTEL_BESTAND) ? trim((string) file_get_contents(SLEUTEL_BESTAND)) : '';
if (strlen($sleutel) < 24) antwoord(500, ['fout' => 'De sleutel op de server ontbreekt of is te kort.']);
$kop = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
$gegeven = preg_match('/^Bearer\s+(\S+)$/', $kop, $m) ? $m[1] : '';
if ($gegeven === '' || !hash_equals($sleutel, $gegeven)) {
    $fouten[$ip][] = $nu;
    @file_put_contents($foutBestand, json_encode($fouten), LOCK_EX);
    antwoord(401, ['fout' => 'Verkeerde sleutel.']);
}

// ---------- de stand lezen
function leesStand(): array {
    $j = is_file(STATUS_BESTAND) ? json_decode((string) @file_get_contents(STATUS_BESTAND), true) : null;
    if (!is_array($j) || !in_array($j['stand'] ?? '', STANDEN, true)) $j = ['stand' => 'open', 'bericht' => '', 'sinds' => null];
    return ['stand' => $j['stand'], 'bericht' => (string) ($j['bericht'] ?? ''), 'sinds' => $j['sinds'] ?? null];
}

if ($methode === 'GET') antwoord(200, ['ok' => true] + leesStand());

// ---------- de stand zetten (in één keer weggeschreven, zodat het bestand nooit half is)
$invoer = json_decode((string) file_get_contents('php://input'), true);
$stand = is_array($invoer) ? (string) ($invoer['stand'] ?? '') : '';
if (!in_array($stand, STANDEN, true)) antwoord(400, ['fout' => 'Onbekende stand. Kies open, admin_only of closed.']);
$bericht = is_array($invoer) ? trim(strip_tags((string) ($invoer['bericht'] ?? ''))) : '';
$bericht = function_exists('mb_substr') ? mb_substr($bericht, 0, 200) : substr($bericht, 0, 200);
$nieuw = ['stand' => $stand, 'bericht' => $bericht, 'sinds' => gmdate('c')];
$tijdelijk = STATUS_BESTAND . '.' . bin2hex(random_bytes(4)) . '.tmp';
$tekst = json_encode($nieuw, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
if (@file_put_contents($tijdelijk, $tekst, LOCK_EX) === false || !@rename($tijdelijk, STATUS_BESTAND)) {
    @unlink($tijdelijk);
    // terugval: mag PHP in deze map geen nieuw bestand maken, schrijf dan rechtstreeks in een bestaand hotel_status.json
    if (@file_put_contents(STATUS_BESTAND, $tekst, LOCK_EX) === false) antwoord(500, ['fout' => 'Kon de stand niet opslaan. Maak hotel_status.json aan en geef PHP schrijfrechten (zie de uitleg).']);
}
antwoord(200, ['ok' => true] + $nieuw);
