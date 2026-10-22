<?php
// =====================================================================
//  Rommelhotel: het rolluik
//  Is het hotel in de werkplaats gesloten, dan zien bezoekers hier een
//  pagina met het rolluik in plaats van het inlogscherm.
//  Jij komt er altijd in: ga één keer naar
//  https://hotel.rubensrommelhoekje.nl/?sleutel=JOUW-GEHEIME-WOORD
// =====================================================================

// 1. Kies hieronder je eigen geheime woord (minstens 12 tekens, geen spaties).
const ROLLUIK_SLEUTEL = 'KIES-HIER-EEN-GEHEIM-WOORD';

// Hieronder hoef je niets te veranderen.
const ROLLUIK_SITE = 'https://rubensrommelhoekje.nl/instellingen.json';

function rolluik_haal(string $url): ?string {
    if (function_exists('curl_init')) {
        $c = curl_init($url);
        curl_setopt_array($c, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 3, CURLOPT_FOLLOWLOCATION => true]);
        $uit = curl_exec($c);
        $code = curl_getinfo($c, CURLINFO_HTTP_CODE);
        curl_close($c);
        return ($uit !== false && $code === 200) ? $uit : null;
    }
    $ctx = stream_context_create(['http' => ['timeout' => 3]]);
    $uit = @file_get_contents($url, false, $ctx);
    return $uit === false ? null : $uit;
}

function rolluik_status(): array {
    $open = ['open' => true, 'bericht' => ''];
    $cache = sys_get_temp_dir() . '/rommelhotel-rolluik.json';
    if (is_file($cache) && time() - filemtime($cache) < 30) {
        $j = json_decode((string) file_get_contents($cache), true);
        if (is_array($j) && isset($j['open'])) return $j;
    }
    $inst = json_decode((string) rolluik_haal(ROLLUIK_SITE . '?' . intdiv(time(), 600)), true);
    $server = is_array($inst) && !empty($inst['scoreUrl']) ? rtrim($inst['scoreUrl'], '/') : null;
    if (!$server) return $open;                                  // onbereikbaar: open laten
    $st = json_decode((string) rolluik_haal($server . '/status'), true);
    if (!is_array($st) || !isset($st['hotel']['open'])) return $open;
    $hotel = ['open' => (bool) $st['hotel']['open'], 'bericht' => (string) ($st['hotel']['bericht'] ?? '')];
    @file_put_contents($cache, json_encode($hotel));
    return $hotel;
}

// beheerders: één keer met ?sleutel=... binnenkomen geeft 30 dagen toegang
$rolluikHash = hash('sha256', 'rommelhotel|' . ROLLUIK_SLEUTEL);
$rolluikGeldig = strlen(ROLLUIK_SLEUTEL) >= 12 && ROLLUIK_SLEUTEL !== 'KIES-HIER-EEN-GEHEIM-WOORD';
if ($rolluikGeldig && isset($_GET['sleutel']) && hash_equals(ROLLUIK_SLEUTEL, (string) $_GET['sleutel'])) {
    setcookie('rolluik', $rolluikHash, ['expires' => time() + 30 * 86400, 'path' => '/', 'secure' => true, 'httponly' => true, 'samesite' => 'Lax']);
    header('Location: /');                                       // het geheime woord meteen uit de adresbalk
    exit;
}
$rolluikBeheerder = $rolluikGeldig && isset($_COOKIE['rolluik']) && hash_equals($rolluikHash, (string) $_COOKIE['rolluik']);

$rolluikHotel = rolluik_status();
if (!$rolluikHotel['open'] && !$rolluikBeheerder) {
    http_response_code(503);
    header('Retry-After: 300');
    header('Cache-Control: no-store');
    $bericht = htmlspecialchars($rolluikHotel['bericht'] !== '' ? $rolluikHotel['bericht'] : 'Het hotel is even gesloten.', ENT_QUOTES, 'UTF-8');
    echo <<<HTML
<!DOCTYPE html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Rommelhotel is gesloten</title>
<style>
html,body{margin:0;height:100%}body{display:grid;place-items:center;background:#24305E;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#231A26;padding:1rem;box-sizing:border-box}
.gevel{width:min(92vw,30rem);background:linear-gradient(#B5523B,#8E3A2B);border-radius:16px 16px 8px 8px;box-shadow:0 8px 0 rgba(0,0,0,.3),inset 0 0 0 4px #5E2418;overflow:hidden;position:relative;padding-bottom:1.2rem}
.dak{height:3.2rem;background:repeating-linear-gradient(90deg,#C8323C 0 14%,#FBF6E9 14% 28%)}
.naam{margin:.9rem auto .7rem;width:max-content;background:#231A26;color:#E9B949;font-weight:900;letter-spacing:.14em;padding:.35rem .9rem;border-radius:7px}
.luik{margin:0 8%;height:15rem;background:repeating-linear-gradient(180deg,#B8C0C8 0 12px,#8E98A3 12px 15px,#D0D6DC 15px 18px);box-shadow:inset 0 -8px 0 #5F6A75;display:grid;place-items:center;animation:zak 1.4s cubic-bezier(.5,0,.3,1)}
@keyframes zak{from{transform:translateY(-100%)}}
.bord{position:relative;background:#FBF6E9;border:4px solid #231A26;border-radius:12px;padding:.8rem 1.2rem;text-align:center;transform:rotate(-3deg);box-shadow:0 5px 0 rgba(0,0,0,.3);max-width:80%}
.bord::before{content:"";position:absolute;left:50%;top:-30px;width:56px;height:30px;transform:translateX(-50%);border:3px solid #231A26;border-bottom:0;border-radius:28px 28px 0 0}
.bord b{display:block;color:#C8323C;font-size:2rem;letter-spacing:.1em}.bord p{margin:.4rem 0 0;line-height:1.4}
a{display:block;width:max-content;margin:1.2rem auto 0;color:#F2DDA0;font-weight:700}
</style></head><body><div><div class="gevel"><div class="dak"></div><div class="naam">ROMMELHOTEL</div><div class="luik"><div class="bord"><b>GESLOTEN</b><p>{$bericht}</p></div></div></div><a href="https://rubensrommelhoekje.nl/">Terug naar het rommelhoekje</a></div></body></html>
HTML;
    exit;
}
