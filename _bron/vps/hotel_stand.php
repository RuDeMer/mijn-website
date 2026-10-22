<?php
// =====================================================================
//  Rommelhotel: de stand uit hotel_status.json lezen (voor bovenaan index.php)
//  Daarna heb je:
//    $hotelStand     'open', 'admin_only' of 'closed'
//    $hotelBericht   het bericht voor bezoekers (kan leeg zijn)
//    $alleen_admin   true bij admin_only en closed: geen registraties, alleen rank >= 7
//    $rolluik_dicht  true bij closed: bezoekers zien het rolluik
//  Kan het bestand niet gelezen worden, dan blijft het hotel gewoon open.
// =====================================================================
$hotelStand = 'open';
$hotelBericht = '';
$hotelStatusBestand = __DIR__ . '/hotel_status.json';
if (is_file($hotelStatusBestand)) {
    $hotelJson = json_decode((string) @file_get_contents($hotelStatusBestand), true);
    if (is_array($hotelJson) && in_array($hotelJson['stand'] ?? '', ['open', 'admin_only', 'closed'], true)) {
        $hotelStand = $hotelJson['stand'];
        $hotelBericht = (string) ($hotelJson['bericht'] ?? '');
    }
}
$alleen_admin = ($hotelStand !== 'open');
$rolluik_dicht = ($hotelStand === 'closed');
