/* homepage-onderdelen.js voor Ruben's rommelhoekje: gereedschap, animaties, iconen, scorebord, sticker, coulissen en de stijl van de kaarten. Upload een nieuwe versie van dit bestand om de homepage bij te werken. */
;(function () {
var s = document.createElement('style'); s.id = 'onderdelen-stijl'; s.textContent = "\n.rek { position: relative; }\n.rek.zijkant { position: absolute; top: 7rem; height: 50rem; width: calc((100% - var(--inhoud)) / 2 - 2rem); display: none; z-index: 0; }\n.rek.zijkant.links { left: 1rem; }\n.rek.zijkant.rechts { right: 1rem; }\n.muurlaag { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; z-index: 3; }\n.gs { position: absolute; pointer-events: none; user-select: none; -webkit-user-select: none; filter: drop-shadow(3px 5px 0 rgba(0,0,0,.25)); z-index: 1; }\n.gs svg { display: block; pointer-events: none; overflow: visible; }\n.gs svg * { pointer-events: visiblePainted; cursor: grab; }\n.gs.sleept { z-index: 30; filter: drop-shadow(9px 16px 0 rgba(0,0,0,.22)); }\n.gs.sleept svg * { cursor: grabbing; }\n.gs-haak { position: absolute; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #A8B3CC; box-shadow: 0 2px 0 rgba(0,0,0,.45); pointer-events: none; z-index: 2; transition: opacity .2s; }\n@media (pointer: coarse) { .gs svg * { cursor: pointer; } }\n.gs-sleept, .gs-sleept * { -webkit-user-select: none !important; user-select: none !important; cursor: grabbing !important; }\n\n.dag b { display: inline-block; }\n.label-icoon svg { transform-origin: 50% 80%; }\n"; document.head.appendChild(s);
})();
;(function () {

const SPELICONEN = {"casino": "<g transform=\"rotate(-12 24 30)\"><rect x=\"8\" y=\"8\" width=\"28\" height=\"40\" rx=\"4\" fill=\"#FBF6E9\" stroke=\"#231A26\" stroke-width=\"2.2\"/><path d=\"M14.5 14.5v6.5M14.5 14.5l3.2 6.5M14.5 17.8h2.4\" stroke=\"#C8323C\" stroke-width=\"1.8\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M22 34c-5-3.2-7.4-5.8-7.4-8.3a3.7 3.7 0 0 1 7.4-.9 3.7 3.7 0 0 1 7.4.9c0 2.5-2.4 5.1-7.4 8.3z\" fill=\"#C8323C\"/></g><circle cx=\"41\" cy=\"41\" r=\"18\" fill=\"#C8323C\" stroke=\"#231A26\" stroke-width=\"2.2\"/><g fill=\"#FBF6E9\"><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(0 41 41)\"/><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(45 41 41)\"/><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(90 41 41)\"/><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(135 41 41)\"/><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(180 41 41)\"/><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(225 41 41)\"/><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(270 41 41)\"/><rect x=\"39\" y=\"23.6\" width=\"4\" height=\"5.4\" rx=\"1\" transform=\"rotate(315 41 41)\"/></g><circle cx=\"41\" cy=\"41\" r=\"11\" fill=\"#E8545D\" stroke=\"#FBF6E9\" stroke-width=\"1.6\"/><path d=\"M34.6 45.6l-1.3-8.2 4.7 3.7 3-5.8 3 5.8 4.7-3.7-1.3 8.2z\" fill=\"#FFD45C\" stroke=\"#231A26\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>", "groepjes": "<g stroke=\"#231A26\" stroke-width=\"2.2\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"6\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#FFB357\" transform=\"rotate(-7 17.5 17.5)\"/><rect x=\"34\" y=\"5\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#5FCDB8\" transform=\"rotate(6 46.5 16.5)\"/><rect x=\"5\" y=\"35\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#D54373\" transform=\"rotate(5 17.5 46.5)\"/><rect x=\"34\" y=\"35\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#333F98\" transform=\"rotate(-5 46.5 46.5)\"/></g><circle cx=\"17.5\" cy=\"18\" r=\"4.2\" fill=\"#231A26\"/><path d=\"M46.5 11.5l5.6 9.6h-11.2z\" fill=\"#231A26\"/><rect x=\"13.5\" y=\"42.5\" width=\"8\" height=\"8\" rx=\"1\" fill=\"#fff\"/><path d=\"M46.50 40.80 L48.03 44.90 L52.40 45.08 L48.97 47.80 L50.14 52.02 L46.50 49.60 L42.86 52.02 L44.03 47.80 L40.60 45.08 L44.97 44.90Z\" fill=\"#FFD45C\"/>", "kaarten": "<g transform=\"rotate(-14 26 36)\"><rect x=\"10\" y=\"12\" width=\"28\" height=\"40\" rx=\"4\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"14\" y=\"16\" width=\"20\" height=\"32\" rx=\"2\" fill=\"none\" stroke=\"#F2DDA0\" stroke-width=\"1.6\"/><path d=\"M24 25l5 7-5 7-5-7z\" fill=\"#F2DDA0\"/></g><g transform=\"rotate(11 40 34)\"><rect x=\"25\" y=\"12\" width=\"28\" height=\"40\" rx=\"4\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M39 41c-6.5-4.2-9.5-7.6-9.5-10.8a4.8 4.8 0 0 1 9.5-1.2 4.8 4.8 0 0 1 9.5 1.2c0 3.2-3 6.6-9.5 10.8z\" fill=\"#C8323C\"/><path d=\"M29 15.5v6M29 15.5l3 6M29 18.5h2.4\" stroke=\"#C8323C\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/></g>", "woord": "<g transform=\"rotate(-8 18 34)\"><rect x=\"5\" y=\"20\" width=\"24\" height=\"24\" rx=\"4\" fill=\"#5F6470\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M12 27h10M17 27v11\" stroke=\"#E6E3DA\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"rotate(6 46 30)\"><rect x=\"35\" y=\"16\" width=\"24\" height=\"24\" rx=\"4\" fill=\"#F2DDA0\" stroke=\"#C8323C\" stroke-width=\"2.4\" stroke-dasharray=\"4 2.4\"/><path d=\"M41 34l6-12 6 12M43.2 29.6h7.6\" stroke=\"#9E2430\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><rect x=\"20\" y=\"30\" width=\"26\" height=\"26\" rx=\"4\" fill=\"#2E8B62\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"41\" cy=\"35\" r=\"2\" fill=\"#fff\"/><path d=\"M25 37l3 12 5-8 5 8 3-12\" stroke=\"#fff\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>", "doos": "<path d=\"M8 26l24-10 24 10v24L32 60 8 50z\" fill=\"#C99A5B\" stroke=\"#7A4E2D\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M8 26l24 10 24-10M32 36v24\" stroke=\"#7A4E2D\" stroke-width=\"2\" fill=\"none\"/><path d=\"M8 26l-4-9 24-9 4 8zM56 26l4-9-24-9-4 8z\" fill=\"#DDB27A\" stroke=\"#7A4E2D\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"38\" y=\"40\" width=\"12\" height=\"8\" rx=\"1\" fill=\"#FBF6E9\" transform=\"rotate(-22 44 44)\"/>", "puzzel": "<path d=\"M12 18h12a6 6 0 1 1 12 0h12v12a6 6 0 1 1 0 12v12H36a6 6 0 1 0-12 0H12V42a6 6 0 1 0 0-12z\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/>", "dobbelsteen": "<g transform=\"rotate(-10 32 32)\"><rect x=\"12\" y=\"12\" width=\"40\" height=\"40\" rx=\"8\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><g fill=\"#1F2333\"><circle cx=\"22\" cy=\"22\" r=\"3.4\"/><circle cx=\"42\" cy=\"22\" r=\"3.4\"/><circle cx=\"32\" cy=\"32\" r=\"3.4\"/><circle cx=\"22\" cy=\"42\" r=\"3.4\"/><circle cx=\"42\" cy=\"42\" r=\"3.4\"/></g></g>", "controller": "<path d=\"M18 22h28c7 0 12 6 13 15l1 8c1 7-6 10-10 5l-5-6H19l-5 6c-4 5-11 2-10-5l1-8c1-9 6-15 13-15z\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M19 30v10M14 35h10\" stroke=\"#F2DDA0\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><circle cx=\"44\" cy=\"31\" r=\"3\" fill=\"#C8323C\"/><circle cx=\"50\" cy=\"37\" r=\"3\" fill=\"#E9B949\"/>", "potlood": "<g transform=\"rotate(40 32 32)\"><rect x=\"25\" y=\"4\" width=\"14\" height=\"40\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"25\" y=\"4\" width=\"14\" height=\"7\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M25 44l7 14 7-14z\" fill=\"#F1D9B5\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M30 54l2 4 2-4z\" fill=\"#1F2333\"/><path d=\"M32 11v33\" stroke=\"#B8862F\" stroke-width=\"1.5\"/></g>", "ster": "<path d=\"M32 6l7.6 16.4 17.9 2.1-13.3 12.2 3.6 17.7L32 45.6l-15.8 8.8 3.6-17.7L6.5 24.5l17.9-2.1z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M24 30a8 8 0 0 0 16 0\" stroke=\"#1F2333\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>", "hamer": "<g transform=\"rotate(-35 32 32)\"><rect x=\"28\" y=\"20\" width=\"8\" height=\"40\" rx=\"3\" fill=\"#B5793F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"14\" y=\"8\" width=\"36\" height=\"14\" rx=\"3\" fill=\"#8C939E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"44\" y=\"6\" width=\"8\" height=\"18\" rx=\"2\" fill=\"#6F7785\" stroke=\"#1F2333\" stroke-width=\"2\"/></g>", "vlaai": "<defs><clipPath id=\"vlaai-icoon-knip\"><circle cx=\"31\" cy=\"32\" r=\"19\"/></clipPath></defs><ellipse cx=\"34\" cy=\"37\" rx=\"28\" ry=\"25\" fill=\"#1F2333\" opacity=\".18\"/><circle cx=\"31\" cy=\"32\" r=\"27\" fill=\"#C98A43\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"31\" cy=\"32\" r=\"23.5\" fill=\"none\" stroke=\"#E0AE66\" stroke-width=\"3.2\" stroke-dasharray=\"4 2.6\"/><circle cx=\"31\" cy=\"32\" r=\"19\" fill=\"#A8162B\"/><g clip-path=\"url(#vlaai-icoon-knip)\" stroke=\"#E0AE66\" stroke-width=\"3.6\"><g transform=\"rotate(45 31 32)\"><path d=\"M8 24h46M8 32h46M8 40h46\"/></g><g transform=\"rotate(-45 31 32)\"><path d=\"M8 24h46M8 32h46M8 40h46\"/></g></g>", "hotel": "<rect x=\"10\" y=\"14\" width=\"44\" height=\"44\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"6\" y=\"10\" width=\"52\" height=\"6\" fill=\"#23252B\"/><g fill=\"#9FD3E8\" stroke=\"#1F2333\" stroke-width=\"1.5\"><rect x=\"15\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"28\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"41\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"15\" y=\"34\" width=\"8\" height=\"8\"/><rect x=\"41\" y=\"34\" width=\"8\" height=\"8\"/></g><rect x=\"27\" y=\"40\" width=\"10\" height=\"18\" fill=\"#7A4E2D\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><path d=\"M24 38h16l2 4H22z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><rect x=\"18\" y=\"4\" width=\"28\" height=\"7\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><g fill=\"#1F2333\"><rect x=\"21\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"25\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"29\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"33\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"37\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"41\" y=\"6\" width=\"2\" height=\"3\"/></g>", "beker": "<path d=\"M20 10h24v14a12 12 0 0 1-24 0z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M20 14h-6a6 6 0 0 0 6 10M44 14h6a6 6 0 0 1-6 10\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><path d=\"M29 36h6v8h-6z\" fill=\"#C99A2E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"22\" y=\"44\" width=\"20\" height=\"7\" rx=\"1.5\" fill=\"#7A4E2D\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M27 15v9\" stroke=\"#FFF3C4\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M32 52v0\" /><rect x=\"27\" y=\"46\" width=\"10\" height=\"3\" fill=\"#E9B949\"/>", "pakje": "<path d=\"M14 8l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4v52l-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4z\" fill=\"#2F8BD6\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"16\" y=\"14\" width=\"34\" height=\"8\" rx=\"1.5\" fill=\"#23252B\"/><rect x=\"17\" y=\"25\" width=\"32\" height=\"26\" rx=\"3\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><path d=\"M33 30l2.5 5.5 6 .6-4.5 4 1.3 5.9L33 43l-5.3 3 1.3-5.9-4.5-4 6-.6z\" fill=\"#E9B949\" stroke=\"#8C6A0A\" stroke-width=\"1.2\"/><path d=\"M14 8h40\" stroke=\"#6EE8F0\" stroke-width=\"2\" stroke-dasharray=\"3 3\"/><rect x=\"22\" y=\"54\" width=\"22\" height=\"5\" rx=\"2.5\" fill=\"#1E4F8C\"/>", "steek": "<circle cx=\"31\" cy=\"33\" r=\"27\" fill=\"#E2B47E\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"31\" cy=\"33\" r=\"21.5\" fill=\"#FBF7EF\" stroke=\"#1F2333\" stroke-width=\"2.2\"/><path d=\"M10 25a22 22 0 0 1 12-13\" fill=\"none\" stroke=\"#F6D9A8\" stroke-width=\"2\" stroke-linecap=\"round\"/><rect x=\"25\" y=\"1.5\" width=\"12\" height=\"8\" rx=\"2.5\" fill=\"#B5652F\" stroke=\"#1F2333\" stroke-width=\"2.2\"/><circle cx=\"31\" cy=\"5.5\" r=\"1.6\" fill=\"#F6CB2F\"/><circle cx=\"17\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"17\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"17\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"17\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"47\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"17\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"47\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"17\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"47\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"47\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"47\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"47\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><path d=\"M18.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#F28CA0\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M23.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#F28CA0\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M33.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M38.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M18.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#F28CA0\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M23.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M28.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M33.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M38.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M23.7 32.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M28.7 32.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M33.7 32.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M28.7 37.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M31 41c4 6 10 9 17 8\" fill=\"none\" stroke=\"#E8577A\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M46 50l13 9\" stroke=\"#1F2333\" stroke-width=\"4.2\" stroke-linecap=\"round\"/><path d=\"M46 50l13 9\" stroke=\"#D8DEE4\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><ellipse cx=\"48.4\" cy=\"51.7\" rx=\"1.6\" ry=\".8\" transform=\"rotate(35 48.4 51.7)\" fill=\"#1F2333\"/>", "recht": "<rect x=\"12\" y=\"20\" width=\"40\" height=\"32\" rx=\"2.5\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-dasharray=\"3.2 3\" opacity=\".4\"/><g transform=\"rotate(-13 32 9)\"><path d=\"M32 9L19 21M32 9L45 21\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><rect x=\"12\" y=\"20\" width=\"40\" height=\"32\" rx=\"2.5\" fill=\"#C99566\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><rect x=\"17.5\" y=\"25.5\" width=\"29\" height=\"21\" fill=\"#C3D8EB\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M17.5 39.5c5-4.5 10-5.5 15-3s9.5 2.5 14 .5v9.5h-29z\" fill=\"#9CC6A6\"/><path d=\"M22 39v-5l3.5-3 3.5 3v5\" fill=\"#E0857A\" stroke=\"#1F2333\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><circle cx=\"40.5\" cy=\"30.5\" r=\"3\" fill=\"#F2D58C\" stroke=\"#1F2333\" stroke-width=\"1.2\"/></g><circle cx=\"32\" cy=\"9\" r=\"2.8\" fill=\"#BDC5CD\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M38 60.5c7 1.2 13.5-.8 18-6.5\" fill=\"none\" stroke=\"#7FB08F\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M51.5 53.2l4.8.6.4 4.6\" fill=\"none\" stroke=\"#7FB08F\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>", "opgevoel": "<path d=\"M2.5 46a29.5 29.5 0 0 1 59 0z\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M9 46a23 23 0 0 1 6.74-16.26\" fill=\"none\" stroke=\"#C8323C\" stroke-width=\"7.5\"/><path d=\"M15.74 29.74a23 23 0 0 1 32.52 0\" fill=\"none\" stroke=\"#E9B949\" stroke-width=\"7.5\"/><path d=\"M48.26 29.74A23 23 0 0 1 55 46\" fill=\"none\" stroke=\"#2E8B62\" stroke-width=\"7.5\"/><path d=\"M32 46l15.5-13.5\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"32\" cy=\"46\" r=\"5.5\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><rect x=\"1.5\" y=\"46\" width=\"61\" height=\"10\" rx=\"3.5\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2.8\"/><path d=\"M54 3l2.3 5.2 5.2 2.3-5.2 2.3L54 18l-2.3-5.2-5.2-2.3 5.2-2.3z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/>", "mengelmoes": "<g transform=\"rotate(-9 21 37)\"><rect x=\"7.5\" y=\"24.5\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#2F5BD3\"/><rect x=\"5\" y=\"22\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#A9C8FF\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M19.5 28.5c-4 4.8-6.2 8-6.2 11a6.2 6.2 0 0 0 12.4 0c0-3-2.2-6.2-6.2-11z\" fill=\"#2F5BD3\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"M16.6 39.6a3 3 0 0 0 2.2 2.8\" fill=\"none\" stroke=\"#FBF6E9\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></g><g transform=\"rotate(10 43 29)\"><rect x=\"31.5\" y=\"16.5\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#FF4FA3\"/><rect x=\"29\" y=\"14\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#FFE27A\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M43.6 19.5c.8 4 6.4 6.3 6.4 12.2a6.4 6.4 0 0 1-12.8 0c0-3.2 1.9-4.6 3-6.6 1 1.9 1.8 2.8 2.9 3.1.9-2.9.9-5.6.5-8.7z\" fill=\"#FF7A2E\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"M43.2 35.7c-1.4 0-2.4-1-2.4-2.4 0-1.2.8-2 1.5-3 .5 1 1 1.4 1.7 1.6.6-.6.9-1.3 1-2.1.7.9 1.1 1.8 1.1 2.8 0 1.8-1.3 3.1-2.9 3.1z\" fill=\"#FFD60A\"/></g><path d=\"M50.5 47.5l2.2 5.4 5.4 2.2-5.4 2.2-2.2 5.4-2.2-5.4-5.4-2.2 5.4-2.2z\" fill=\"#FF4FA3\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><circle cx=\"9\" cy=\"10\" r=\"2.2\" fill=\"#00A57A\"/><circle cx=\"16\" cy=\"6.5\" r=\"1.5\" fill=\"#FF4FA3\"/><circle cx=\"14.5\" cy=\"13\" r=\"1.2\" fill=\"#2F5BD3\"/>", "wheels": "<path d=\"M4 24h14M2 33h12M5 42h11\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"38\" cy=\"33\" r=\"23\" fill=\"#1F2333\"/><circle cx=\"38\" cy=\"33\" r=\"18\" fill=\"#F28C28\"/><circle cx=\"38\" cy=\"33\" r=\"13\" fill=\"#4A2818\"/><path d=\"M38 20v26M25 33h26M29 24l18 18M47 24L29 42\" stroke=\"#F2DDA0\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><circle cx=\"38\" cy=\"33\" r=\"6\" fill=\"#F6F0E4\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"36\" cy=\"32\" r=\"1.4\" fill=\"#1F2333\"/><circle cx=\"40\" cy=\"32\" r=\"1.4\" fill=\"#1F2333\"/>", "steiger": "<path d=\"M14 58V12M50 58V12M14 26h36M14 44h36M14 26l36 18\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"7\" stroke-linecap=\"round\"/><path d=\"M14 58V12M50 58V12M14 26h36M14 44h36M14 26l36 18\" fill=\"none\" stroke=\"#B8C0C8\" stroke-width=\"3.6\" stroke-linecap=\"round\"/><rect x=\"6\" y=\"6\" width=\"52\" height=\"9\" rx=\"2.5\" fill=\"#E0A64E\" stroke=\"#1F2333\" stroke-width=\"3\"/><path d=\"M18 10.5h6M32 10.5h6M46 10.5h4\" stroke=\"#B07A2E\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"14\" cy=\"26\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"50\" cy=\"44\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"14\" cy=\"44\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"50\" cy=\"26\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "fiets": "<circle cx=\"17\" cy=\"42\" r=\"11\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"4\"/><circle cx=\"47\" cy=\"42\" r=\"11\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"4\"/><circle cx=\"17\" cy=\"42\" r=\"2.5\" fill=\"#8C939E\"/><circle cx=\"47\" cy=\"42\" r=\"2.5\" fill=\"#8C939E\"/><path d=\"M17 42l10-18h16l4 18M27 24l8 18h-18M43 24l-2-7h-6\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M17 42l10-18h16l4 18M27 24l8 18h-18M43 24l-2-7h-6\" fill=\"none\" stroke=\"#8E1F2A\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M22 20h10\" stroke=\"#1F2333\" stroke-width=\"4.5\" stroke-linecap=\"round\"/><path d=\"M33 13h8\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linecap=\"round\"/><path d=\"M46 8c3 0 6 2 6 5\" fill=\"none\" stroke=\"#E9B949\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M49 4c5 1 8 4 8 9\" fill=\"none\" stroke=\"#E9B949\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>", "bel": "<circle cx=\"20\" cy=\"18\" r=\"10\" fill=\"#E8414E\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"40\" cy=\"18\" r=\"10\" fill=\"#3A86E8\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"30\" cy=\"34\" r=\"10\" fill=\"#F5C330\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"16\" cy=\"14\" r=\"3\" fill=\"#fff\" opacity=\".7\"/><circle cx=\"36\" cy=\"14\" r=\"3\" fill=\"#fff\" opacity=\".7\"/><circle cx=\"26\" cy=\"30\" r=\"3\" fill=\"#fff\" opacity=\".7\"/><path d=\"M32 60V50\" stroke=\"#1F2333\" stroke-width=\"7\" stroke-linecap=\"round\"/><circle cx=\"32\" cy=\"48\" r=\"7\" fill=\"#3DB06A\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M22 60h20\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "rob": "<path d=\"M6 12q0-6 6-6h40q6 0 6 6v20q0 6-6 6H26l-10 9v-9h-4q-6 0-6-6z\" fill=\"#FFE76A\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"32\" y=\"29\" text-anchor=\"middle\" font-family=\"Impact, Arial Black, sans-serif\" font-size=\"16\" font-weight=\"900\" fill=\"#C8323C\" transform=\"rotate(-6 32 26)\">ROB</text><path d=\"M38 60h14q3 0 3-3l2-10q0-3-3-3h-7l1-6q0-4-3-4l-6 9v17z\" fill=\"#F2C2A8\" stroke=\"#1F2333\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/><rect x=\"32\" y=\"45\" width=\"6\" height=\"15\" rx=\"1.5\" fill=\"#2F6FD6\" stroke=\"#1F2333\" stroke-width=\"2.4\"/>", "arend": "<circle cx=\"32\" cy=\"32\" r=\"26\" fill=\"#8EC5EE\" stroke=\"#1F2333\" stroke-width=\"3\"/><path d=\"M14 50h36\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><path d=\"M28 50l4-30 4 30z\" fill=\"#7A6248\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M27 40h10M29 30h6\" stroke=\"#1F2333\" stroke-width=\"1.8\"/><path d=\"M10 26q10-8 18-2l4 3 4-3q8-6 18 2q-8 0-12 6l-10 2-10-2q-4-6-12-6z\" fill=\"#5A3A22\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"32\" cy=\"27\" r=\"3.2\" fill=\"#F4F0E6\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M32 29l1.6 2.4h-3.2z\" fill=\"#E9B949\"/>", "rommelkroon": "<rect x=\"6\" y=\"6\" width=\"52\" height=\"52\" rx=\"5\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"3\"/><path d=\"M6 23h52M6 40h52M23 6v52M40 6v52\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"7.5\" y=\"7.5\" width=\"15\" height=\"15\" fill=\"#F4A6A6\"/><rect x=\"40.5\" y=\"24\" width=\"16\" height=\"15\" fill=\"#A9C4F5\"/><rect x=\"24\" y=\"41\" width=\"15\" height=\"15.5\" fill=\"#B8E0A0\"/><path d=\"M27 34l-1.5-10 5 4 3.5-7 3.5 7 5-4-1.5 10z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M45 13l7 7M52 13l-7 7\" stroke=\"#1F2333\" stroke-width=\"2.4\" stroke-linecap=\"round\" opacity=\".6\"/>", "ritme": "<rect x=\"8\" y=\"22\" width=\"26\" height=\"26\" rx=\"3\" fill=\"#8AFF6A\" stroke=\"#1F2333\" stroke-width=\"3\"/><rect x=\"14\" y=\"30\" width=\"4\" height=\"5\" fill=\"#1F2333\"/><rect x=\"24\" y=\"30\" width=\"4\" height=\"5\" fill=\"#1F2333\"/><rect x=\"15\" y=\"39\" width=\"12\" height=\"2.6\" fill=\"#1F2333\"/><path d=\"M44 10v24\" stroke=\"#1F2333\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><path d=\"M44 10l12 4v7l-12-4\" fill=\"#FF5AA8\" stroke=\"#1F2333\" stroke-width=\"2.6\" stroke-linejoin=\"round\"/><ellipse cx=\"40\" cy=\"35\" rx=\"5.5\" ry=\"4.2\" fill=\"#FF5AA8\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M4 56h56\" stroke=\"#5EE6FF\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M44 56l6-8 6 8z\" fill=\"#1F2333\"/>", "vlieger": "<path d=\"M6 34L58 8 34 56l-6-16z\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M58 8L28 40l-22-6z\" fill=\"#DCE4F5\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M58 8L28 40l6 16\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M4 50q8-4 14 0M10 58q6-3 12 0\" fill=\"none\" stroke=\"#5EC2E8\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "blok": "<path d=\"M32 6L56 18 32 30 8 18z\" fill=\"#5FA83E\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 18l24 12v28L8 46z\" fill=\"#8A5A36\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M56 18L32 30v28l24-12z\" fill=\"#6E4426\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 18l24 12 24-12\" fill=\"none\" stroke=\"#7CC452\" stroke-width=\"2\"/><path d=\"M14 24v6M22 28v8M42 30v6M50 26v8\" stroke=\"#5FA83E\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "pretpark": "<circle cx=\"32\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"#C8323C\" stroke-width=\"4\"/><circle cx=\"32\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"1.5\" opacity=\".6\"/><path d=\"M32 6v40M12 26h40M18 12l28 28M46 12L18 40\" stroke=\"#E9B949\" stroke-width=\"2.5\"/><circle cx=\"32\" cy=\"26\" r=\"4\" fill=\"#1F2333\"/><path d=\"M20 58l12-32 12 32\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linejoin=\"round\"/><rect x=\"6\" y=\"56\" width=\"52\" height=\"5\" rx=\"2\" fill=\"#2E8B62\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"27\" y=\"2\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#2F8BD6\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"47\" y=\"22\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#F6CB2F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"7\" y=\"22\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#E8577A\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "duiker": "<defs><linearGradient id=\"duiker-zee\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#5FBCD6\"/><stop offset=\"1\" stop-color=\"#1B5C80\"/></linearGradient></defs><circle cx=\"32\" cy=\"32\" r=\"29\" fill=\"url(#duiker-zee)\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M6 46c6-3 10 2 16 0M42 50c5-2 9 1 14-1\" stroke=\"#BFE6F2\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/><ellipse cx=\"16\" cy=\"38\" rx=\"3\" ry=\"4\" fill=\"#DCA686\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><ellipse cx=\"48\" cy=\"38\" rx=\"3\" ry=\"4\" fill=\"#DCA686\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M17 32c0 14 6 23 15 23s15-9 15-23c0-8-6-12-15-12s-15 4-15 12z\" fill=\"#EFC6A6\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M15 31c-1-12 7-20 18-20 9 0 15 5 16 12l-2 6c-3-5-7-8-12-8-6 0-9 2-14 3l-3 8z\" fill=\"#33231C\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M21 19c5-5 14-6 21-2M25 23c4-3 9-3 13-2\" stroke=\"#6A4E3C\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"14\" y=\"27\" width=\"36\" height=\"14\" rx=\"6\" fill=\"#22262E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"17\" y=\"29.5\" width=\"30\" height=\"9\" rx=\"4\" fill=\"#9FD3E0\"/><path d=\"M19 30.5h11l-1.2 5.5c-.4 1.6-2 2-4.5 2s-4-.6-4.6-2z M34 30.5h11l-.7 5.5c-.6 1.6-2.1 2-4.6 2s-4.1-.4-4.5-2z\" fill=\"none\" stroke=\"#8A93A3\" stroke-width=\"1.4\"/><circle cx=\"25\" cy=\"33.5\" r=\"1.6\" fill=\"#2A201C\"/><circle cx=\"39\" cy=\"33.5\" r=\"1.6\" fill=\"#2A201C\"/><path d=\"M20 31l3-.5\" stroke=\"#FFFFFF\" stroke-width=\"1.2\" stroke-linecap=\"round\"/><path d=\"M24 45.5c3-1.2 5-1.2 8-.2 3-1 5-1 8 .2\" stroke=\"#4B3629\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"27\" y=\"47\" width=\"10\" height=\"4.5\" rx=\"2\" fill=\"#22262E\" stroke=\"#1F2333\" stroke-width=\"1.2\"/><path d=\"M29 53.5c1 1.6 5 1.6 6 0\" stroke=\"#4B3629\" stroke-width=\"2.6\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"51\" cy=\"17\" r=\"3\" fill=\"#CFF4FF\" stroke=\"#1F2333\" stroke-width=\"1.4\"/><circle cx=\"55\" cy=\"10\" r=\"2\" fill=\"#CFF4FF\" stroke=\"#1F2333\" stroke-width=\"1.2\"/>", "idee": "<rect x=\"10\" y=\"22\" width=\"44\" height=\"34\" rx=\"4\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><rect x=\"18\" y=\"28\" width=\"28\" height=\"6\" rx=\"3\" fill=\"#1F2333\"/><path d=\"M14 56h36v4H14z\" fill=\"#9E2430\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"44\" cy=\"16\" r=\"11\" fill=\"#FFE76A\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><path d=\"M40 26h8v5h-8z\" fill=\"#9AA6C2\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M41 15q3-4 6 0\" stroke=\"#E9B949\" stroke-width=\"2\" fill=\"none\"/><path d=\"M44 1v-3M55 6l3-2M33 6l-3-2M58 16h3M30 16h-3\" stroke=\"#E9B949\" stroke-width=\"2.5\" stroke-linecap=\"round\" transform=\"translate(0 2)\"/><rect x=\"20\" y=\"40\" width=\"24\" height=\"10\" rx=\"2\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M20 40l12 6 12-6\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "label": "<path d=\"M14 10h24l16 16-24 28-20-18z\" fill=\"#F2DDA0\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\" transform=\"rotate(8 32 32)\"/><circle cx=\"24\" cy=\"21\" r=\"4\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M24 17c-6-8-14-6-16-1\" stroke=\"#1F2333\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>", "reclame": "<rect x=\"10\" y=\"8\" width=\"32\" height=\"52\" rx=\"6\" fill=\"#1F2333\"/><rect x=\"14\" y=\"14\" width=\"24\" height=\"38\" rx=\"3\" fill=\"#FBF6E9\"/><path d=\"M22 25 L32 33 L22 41 Z\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"26\" cy=\"56\" r=\"1.8\" fill=\"#6A6F80\"/><path d=\"M47.0 4.0 L49.9 8.0 L54.6 6.5 L54.7 11.4 L59.4 13.0 L56.5 17.0 L59.4 21.0 L54.7 22.6 L54.6 27.5 L49.9 26.0 L47.0 30.0 L44.1 26.0 L39.4 27.5 L39.3 22.6 L34.6 21.0 L37.5 17.0 L34.6 13.0 L39.3 11.4 L39.4 6.5 L44.1 8.0Z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><rect x=\"45.4\" y=\"10\" width=\"3.2\" height=\"9\" rx=\"1.6\" fill=\"#1F2333\"/><circle cx=\"47\" cy=\"23\" r=\"1.9\" fill=\"#1F2333\"/>", "huis": "<circle cx=\"32\" cy=\"32\" r=\"29\" fill=\"#F2DDA0\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M23 42l-3 13M41 42l3 13M19 51h7M38 51h7\" stroke=\"#7A4E2D\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"17\" y=\"24\" width=\"30\" height=\"19\" rx=\"1.5\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><path d=\"M12 26L32 9l20 17z\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/><rect x=\"23\" y=\"28\" width=\"18\" height=\"12\" fill=\"#3B4C6E\" stroke=\"#1F2333\" stroke-width=\"1.8\"/><path d=\"M26 40v-5l2-4 2 3h4l2-3 2 4v5z\" fill=\"#7F796B\" stroke=\"#1F2333\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><circle cx=\"29.6\" cy=\"36.4\" r=\"1\" fill=\"#D0CC7C\"/><circle cx=\"34.4\" cy=\"36.4\" r=\"1\" fill=\"#D0CC7C\"/><path d=\"M31.3 38.2h1.4l-.7.8z\" fill=\"#D88F7E\"/><path d=\"M40 41c1.5 3-.5 5.5 2 8\" stroke=\"#40342A\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M41.6 46.6c.3 1.3.4 2 .9 2.6\" stroke=\"#B28B5C\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M38 18l1-6h4v9\" fill=\"#B5B0A4\" stroke=\"#1F2333\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/>", "cryptisch": "<g transform=\"rotate(-6 32 32)\"><rect x=\"8\" y=\"9\" width=\"48\" height=\"46\" rx=\"3\" fill=\"#FFFDF7\" stroke=\"#231A26\" stroke-width=\"2.6\"/><path d=\"M15 20h34M15 28h22\" stroke=\"#231A26\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><path d=\"M15 37q3-3.5 6 0t6 0 6 0 6 0\" fill=\"none\" stroke=\"#C8323C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><g fill=\"#F6E05E\" stroke=\"#231A26\" stroke-width=\"2\"><rect x=\"15\" y=\"43\" width=\"7\" height=\"7\"/><rect x=\"22\" y=\"43\" width=\"7\" height=\"7\"/><rect x=\"29\" y=\"43\" width=\"7\" height=\"7\"/><rect x=\"36\" y=\"43\" width=\"7\" height=\"7\"/></g></g>", "letterval": "<rect x=\"4\" y=\"30\" width=\"56\" height=\"30\" rx=\"4\" fill=\"#7A4E2D\" stroke=\"#231A26\" stroke-width=\"2.4\"/><g stroke=\"#231A26\" stroke-width=\"2\"><rect x=\"9\" y=\"34\" width=\"14\" height=\"14\" rx=\"3\" fill=\"#5E9E3E\"/><rect x=\"25\" y=\"34\" width=\"14\" height=\"14\" rx=\"3\" fill=\"#D9533D\"/><rect x=\"41\" y=\"34\" width=\"14\" height=\"14\" rx=\"3\" fill=\"#E8862A\"/><rect x=\"25\" y=\"6\" width=\"14\" height=\"14\" rx=\"3\" fill=\"#4F7FBF\"/></g><path d=\"M32 22v8\" stroke=\"#231A26\" stroke-width=\"2.6\" stroke-dasharray=\"3 3\"/><text x=\"16\" y=\"45.5\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"11\" text-anchor=\"middle\" fill=\"#fff\">L</text><text x=\"32\" y=\"45.5\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"11\" text-anchor=\"middle\" fill=\"#fff\">E</text><text x=\"48\" y=\"45.5\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"11\" text-anchor=\"middle\" fill=\"#fff\">T</text><text x=\"32\" y=\"17.5\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"11\" text-anchor=\"middle\" fill=\"#fff\">V</text>", "klinker": "<g stroke=\"#231A26\" stroke-width=\"2.2\"><rect x=\"5\" y=\"5\" width=\"26\" height=\"26\" fill=\"#D8D2C3\"/><rect x=\"33\" y=\"5\" width=\"26\" height=\"26\" fill=\"#EDE8DB\"/><rect x=\"5\" y=\"33\" width=\"26\" height=\"26\" fill=\"#EDE8DB\"/><rect x=\"33\" y=\"33\" width=\"26\" height=\"26\" fill=\"#D8D2C3\"/></g><path d=\"M12 27V9\" stroke=\"#231A26\" stroke-width=\"2.6\"/><path d=\"M12 9l12 5-12 5z\" fill=\"#C8323C\"/><text x=\"46\" y=\"27\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"20\" text-anchor=\"middle\" fill=\"#231A26\">K</text><text x=\"18\" y=\"55\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"20\" text-anchor=\"middle\" fill=\"#C8323C\">A</text><text x=\"46\" y=\"55\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"16\" text-anchor=\"middle\" fill=\"#2E8B3A\">2</text>"};
document.querySelectorAll('.label:not(.leeg) .label-kaart').forEach(a => {
  let s = a.querySelector('.label-icoon');
  if (!s) { s = document.createElement('span'); s.className = 'label-icoon'; s.setAttribute('aria-hidden', 'true'); a.prepend(s); }
  const n = SPELICONEN[a.dataset.icoon] ? a.dataset.icoon : 'doos';
  s.innerHTML = '<svg viewBox="0 0 64 64" focusable="false">' + SPELICONEN[n] + '</svg>';
});

// ================================================================ HOMEPAGE 0.8: overzichtelijk in categorieën
(function v8() {
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', v8); return; }
  if (!document.querySelector('.held') || !document.querySelector('.label-kaart')) return; // alleen op de homepage
  const CATEGORIEEN = [
    { id: 'werelden', naam: 'Werelden om te ontdekken', kort: 'Werelden', paginas: ['rubendeduiker', 'rommelhotel', 'rommelland', 'rommelblok', 'rommelarend'], woorden: /avontuur|wereld|hotel|3d|ontdek|duik/ },
    { id: 'verzamelen', naam: 'Verzamelen en bouwen', kort: 'Verzamelen', paginas: ['mengelmoes', 'rommelbeesten', 'vlaaienbakker'], woorden: /verzamel|bouw|bak|klik/ },
    { id: 'snel', naam: 'Snel een potje', kort: 'Snel een potje', paginas: ['rommelcasino', 'huisopstelten', 'opgevoel', 'rommelwheels', 'productiefiets', 'vouwvlieger', 'rommelritme', 'rommelpoker', 'rob'], woorden: /ritme|kaart|vlieg|race|arcade|fiets|ren|casino|fiche/ },
    { id: 'puzzels', naam: 'Puzzels', kort: 'Puzzels', paginas: ['rommelgroepjes', 'rommelwoord', 'cryptisch', 'letterval', 'klinkermijnen', 'reclame', 'steigerstress', 'rommelkroon', 'rommelbel'], woorden: /puzzel|woord|raad|denk|steiger|reclame|cryptisch|letter|klinker/ },
    { id: 'rustig', naam: 'Even rustig', kort: 'Rustig', paginas: ['rommelrecht', 'rommelsteek'], woorden: /rustig|borduur|steek|ontspan|kleur/ },
    { id: 'meer', naam: 'Rond het rommelhoekje', kort: 'Meer', paginas: ['scorebord', 'ideeenbox'], woorden: /tool|bord|box|idee|score/ },
  ];
  const pagina = a => ((a.getAttribute('href') || '').split('/').pop() || '').replace(/\.html?$/, '').toLowerCase();
  const leesJSON = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  // de woordspellen (Cryptisch, Letterval, Klinkermijnen): één teken per dag in d ('.' niet gespeeld, 1-9 gelukt, x niet gelukt), dag 0 is 8 oktober 2026
  const woordVg = (k, open) => { const s = leesJSON(k); if (!s || typeof s.d !== 'string') return null; const n = new Date(), i = Math.round((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - Date.UTC(2026, 9, 8)) / 864e5), x = s.d[i] || '.', ok = c => /[1-9]/.test(c || '.');
    let r = 0; for (let j = ok(x) ? i : i - 1; j >= 0 && ok(s.d[j]); j--) r++; return [(ok(x) ? 'Vandaag gelukt' : x === 'x' ? 'Vandaag niet gelukt' : open) + (r > 1 ? ' · reeks van ' + r + ' dagen' : ''), null]; };
  // grote getallen zoals de Vlaaienbakker ze schrijft (fmt() in vlaaienbakker.html): tot een miljoen voluit, dan met een naam tot deciljard, daarboven m × 10^e
  // grote getallen zoals de Vlaaienbakker ze schrijft: met een naam tot centiljard (10^603), daarboven als macht; met de keuze van de speler (getal in vlaaienbakker-v1)
  const STAM = [['', 'm', 'b', 'tr', 'quadr', 'quint', 'sext', 'sept', 'oct', 'non'], ['', 'un', 'duo', 'tre', 'quattuor', 'quin', 'sex', 'septen', 'octo', 'novem'], ['', 'dec', 'vigint', 'trigint', 'quadragint', 'quinquagint', 'sexagint', 'septuagint', 'octogint', 'nonagint']];
  const getalNaam = i => { const n = Math.ceil(i / 2); return (n < 10 ? STAM[0][n] : n === 100 ? 'cent' : STAM[1][n % 10] + STAM[2][Math.floor(n / 10)]) + (i % 2 ? 'iljoen' : 'iljard'); };
  // lange getalnamen mogen afbreken tussen hun delen (quattuor-septuagint-iljoen): onzichtbare afbreekstreepjes
  const zachtNaam = s => String(s).replace(/(quattuor|septen|novem|octo|quin|duo|tre|sex|un)(?=(dec|vigint|trigint|quadragint|quinquagint|sexagint|septuagint|octogint|nonagint)iljo?)/g, '$1­').replace(/([a-z]{4,})(iljoen|iljard)/g, '$1­$2');
  const hoog = e => String(e).replace(/\d/g, c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]), nl2 = (x, d) => x.toLocaleString('nl-NL', { maximumFractionDigits: d });
  const alsMacht = L => { let e = Math.floor(L), m = Math.pow(10, L - e); if (Math.round(m * 100) / 100 >= 10) { m /= 10; e++; } return nl2(m, 2) + ' × 10' + hoog(e); };
  // L: de 10-log; n: het gewone getal als dat er is (dan precies zoals het spel)
  const grootLog = (L, n, stijl) => {
    if (L < 6) return Math.floor(n != null ? n : Math.pow(10, L) + 1e-9).toLocaleString('nl-NL');
    if (stijl === 'macht') return alsMacht(L);
    let i = Math.floor((Math.floor(L + 1e-12) - 3) / 3); if (i > 200) return alsMacht(L);
    let w = n != null && n < 1e300 ? Math.floor(n) / Math.pow(10, 3 * i + 3) : Math.pow(10, L - (3 * i + 3)), d = w < 100 ? 2 : 1;
    if (Math.round(w * Math.pow(10, d)) / Math.pow(10, d) >= 1000) { i++; w /= 1000; d = 2; if (i > 200) return alsMacht(L); }
    return nl2(w, d) + ' ' + zachtNaam(getalNaam(i)) + (stijl === 'beide' ? ' (10' + hoog(Math.floor(L + 1e-12)) + ')' : '');
  };
  // een getal uit de opslag van de Vlaaienbakker, als 10-log: boven 10^300 staat het precies als tekst in s.groot[pad]
  const vbLog = (s, pad) => {
    const x = pad.split('.').reduce((o, k) => (o == null ? undefined : o[k]), s), P = pad.startsWith('gilde.') ? 1e270 : 1e300;
    const r = s.groot && /^\s*(\d+(?:\.\d+)?)(?:e([+-]?\d+))?\s*$/i.exec(String(s.groot[pad] || '')), g = r && parseFloat(r[1]) > 0 ? Math.log10(parseFloat(r[1])) + (r[2] ? parseInt(r[2], 10) : 0) : NaN;
    if (typeof x !== 'number' || !isFinite(x)) return isFinite(g) ? g : -Infinity;
    if (isFinite(g) && x >= P / 1e20) return g;
    return x > 0 ? Math.log10(x) : -Infinity;
  };
  // voortgang per spel, uit de opslag van dat spel. Elk spel bewaart zelf hoeveel er in totaal is (voortgangTotaal);
  // het getal erachter is de terugval voor opslag van vóór die tijd.
  const totaal = (s, n) => (s && s.voortgangTotaal > 0 ? s.voortgangTotaal : n);
  const VOORTGANG = {
    huisopstelten: () => { const s = leesJSON('huisopstelten-v1'); if (!s || !s.k) return null; const t = totaal(s, 9), n = Object.values(s.k).reduce((a, k) => a + ((k && k.s) || []).filter(Boolean).length, 0); return n ? [n + ' van ' + t + ' sterren', Math.min(1, n / t)] : s.besteDag ? ['Uitdaging: ' + s.besteDag + ' punten', 0] : null; },
    rubendeduiker: () => { const s = leesJSON('rubendeduiker-v1'); if (!s || !s.dag) return null; const t = totaal(s, 5), h = Math.min(s.hfd || 1, t + 1); return h > t ? ['Verhaal uitgespeeld · dag ' + s.dag, 1] : ['Hoofdstuk ' + h + ' van ' + t + ' · dag ' + s.dag, Math.min(1, (h - 1) / t)]; },
    rommelkroon: () => { const s = leesJSON('rommelkroon-v1'), t = totaal(s, 500); const n = s && s.opgelost ? Object.keys(s.opgelost).length : 0; return n ? [n + ' van ' + t + ' puzzels', Math.min(1, n / t)] : null; },
    rommelbeesten: () => { const s = leesJSON('rommelbeesten-v1'), t = totaal(s, 350); const heb = b => (Array.isArray(b) ? (b[0] || 0) + (b[1] || 0) > 0 : !!(b && (b.n || b.g || b > 0))); const n = s && s.bezit ? Object.values(s.bezit).filter(heb).length : 0; return n ? [n + ' van ' + t + ' kaarten', Math.min(1, n / t)] : null; },
    vlaaienbakker: () => { const s = leesJSON('vlaaienbakker-v1'); if (!s) return null; const pad = vbLog(s, 'alles') >= vbLog(s, 'ooit') ? 'alles' : 'ooit', L = vbLog(s, pad); if (!(L >= 0)) return null; const x = pad.split('.').reduce((o, k) => o && o[k], s); return [grootLog(L, typeof x === 'number' && L < 300 ? x : null, ['naam', 'macht', 'beide'].includes(s.getal) ? s.getal : 'naam') + ' vlaaien' + (s.oer && s.oer.n > 0 ? ' · ' + s.oer.n + (s.oer.n === 1 ? ' Oerknal' : ' Oerknallen') : ''), null]; },
    vouwvlieger: () => { const s = leesJSON('vouwvlieger-v1'); return s && s.best ? ['Record: ' + s.best, Math.min(1, s.best / 100)] : null; },
    rommelritme: () => { const s = leesJSON('rommelritme-v1'); if (!s || !s.best) return null; const w = Object.values(s.best), lv = Math.max(totaal(s, 6), w.length); const som = w.reduce((a, b) => a + b, 0); return som ? ['Gemiddeld ' + Math.round(som / lv) + '% per level', Math.min(1, som / (lv * 100))] : null; },
    rommelwoord: () => { const s = leesJSON('rommelwoord-stats-v1'); if (!s) return null; const r = s.reeks || s.streak || 0, g = s.gespeeld || s.played || 0; return g ? [r ? 'Reeks van ' + r + ' dagen' : g + ' keer gespeeld', null] : null; },
    rommelhotel: () => { const s = leesJSON('rommelhotel-v1'), t = totaal(s, 39); const n = s && s.verhaal && s.verhaal.opgelost ? Object.keys(s.verhaal.opgelost).length : 0; return n ? [n + ' van ' + t + ' puzzels opgelost', Math.min(1, n / t)] : s ? ['Ga verder in het hotel', null] : null; },
    rommelpoker: () => { const s = leesJSON('rommelpoker-record'); if (!s || typeof s !== 'object') return null; const t = totaal(s, 24); return s.verst > 0 ? ['Verst: ' + Math.min(s.verst, t) + ' van ' + t + ' kraampjes' + (s.verst > t ? ' en verder' : ''), Math.min(1, s.verst / t)] : s.beste > 0 ? ['Beste hand: ' + Math.round(s.beste).toLocaleString('nl-NL') + ' punten', null] : null; },
    rommelarend: () => { const s = leesJSON('rommelarend-v1'), t = totaal(s, 18); const n = s && s.ontdekt ? s.ontdekt.length : 0; return n ? [n + ' van ' + t + ' plekken', Math.min(1, n / t)] : null; },
    rommelsteek: () => { const s = leesJSON('rommelsteek-v1'); if (!s) return null; const ids = Object.keys(s.af || {}), af = ids.length, vast = ids.filter(k => !/^dag/.test(k)).length, bezig = Object.values(s.werk || {}).filter(w => w.includes('1') && w.includes('0')).length; return af || bezig ? [af ? af + ' borduurwerk' + (af === 1 ? '' : 'en') + ' af' : 'Borduurwerk onderhanden', Math.min(1, vast / totaal(s, 113)) || null] : null; },
    cryptisch: () => woordVg('cryptisch-v1', 'De omschrijving van vandaag staat klaar'),
    letterval: () => woordVg('letterval-v1', 'Het rooster van vandaag staat klaar'),
    klinkermijnen: () => woordVg('klinkermijnen-v1', 'Het veld van vandaag staat klaar'),
    rommelgroepjes: () => { const s = leesJSON('rommelgroepjes-v1'); if (!s || !s.p) return null; let n = 0; try { const m = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/); n = Math.round((Date.UTC(+m[1], m[2] - 1, +m[3]) - Date.UTC(2026, 9, 29)) / 864e5) + 1; } catch (e) {} const v = Object.values(s.p).map(String), op = v.filter(x => x[0] === 'w' || x[0] === 'a').length, t = Math.max(1, n, totaal(s, v.length)), x = String(s.p[n] || '')[0] || ''; let r = 0; if (x !== 'v') for (let d = x === 'w' ? n : n - 1; d > 0 && String(s.p[d] || '')[0] === 'w'; d--) r++; return [(x === 'w' ? 'Vandaag opgelost' : x === 'v' ? 'Vandaag niet gelukt' : 'De puzzel van vandaag staat klaar') + (r > 1 ? ' · reeks van ' + r + ' dagen' : ''), Math.min(1, op / t)]; },
    opgevoel: () => { const s = leesJSON('opgevoel-v1'); if (!s || !s.stat || !s.stat.dag || !s.stat.dag.n) return null; const d = new Date(), k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'), v = s.dagen && s.dagen[k]; return [v ? 'Vandaag ' + v.t + ' van 500' : 'De dagronde van vandaag staat klaar', (v ? v.t : s.stat.dag.best) / 500]; },
    rommelrecht: () => { const s = leesJSON('rommelrecht-v1'), t = totaal(s, 139); if (!s) return null; const n = Object.keys(s.gehaald || {}).filter(k => !k.startsWith('dag-')).length; return n ? [n + ' van ' + t + ' puzzels netjes', Math.min(1, n / t)] : null; },
    mengelmoes: () => { const s = leesJSON('mengelmoes-v1'); if (!s || !Array.isArray(s.el) || s.el.length <= 4) return null; const n = s.el.length, e = s.el.filter(x => x && x[4]).length; return [n + ' stickers' + (e ? ' · ' + e + '× 1e druk' : ''), Math.min(1, n / 500)]; },
    rommelwheels: () => { const s = leesJSON('rommelwheels-v1'); if (!s || !s.levels) return null; let st = 0; for (const r of Object.values(s.levels)) st += (r.gehaald ? 1 : 0) + (r.alle ? 1 : 0) + (r.heel ? 1 : 0); const t = totaal(s, 39); return st ? [st + ' van ' + t + ' sterren', Math.min(1, st / t)] : null; },
    steigerstress: () => { const s = leesJSON('steiger-v1'); if (!s || !s.sterren) return null; const st = Object.values(s.sterren).reduce((a, b) => a + b, 0); return st ? [st + ' van 36 sterren', st / 36] : null; },
    productiefiets: () => { const s = leesJSON('productiefiets-v1'); if (!s || !s.best) return null; return ['Verste rit ' + s.bestMeter + ' m', Math.min(1, s.bestMeter / 5000)]; },
    rommelcasino: () => { const s = leesJSON('rommelcasino-v1'); if (!s) return null; const st = +s.ster || 0, t = totaal(s, 122); return st ? [st + ' van ' + t + ' sterren', Math.min(1, st / t)] : null; },
    reclame: () => { const s = leesJSON('reclame-v1'); if (!s || !s.s) return null; let st = 0; for (const v of Object.values(s.s)) for (const c of String(v)) st += Math.min(3, +c || 0); const t = totaal(s, 540); return st ? [st + ' van ' + t + ' sterren', Math.min(1, st / t)] : null; },
    rommelbel: () => { const s = leesJSON('rommelbel-v1'); if (!s) return null; const st = Object.values(s.sterren || {}).reduce((a, b) => a + b, 0), t = totaal(s, 90); return st || s.eindeloos ? [st + ' van ' + t + ' sterren', Math.min(1, st / t)] : null; },
    rob: () => { const s = leesJSON('rommelrob-v1'); return s && s.best ? ['Record: ' + s.best + ' duimpjes', null] : null; },
    rommelland: () => (localStorage.getItem('rommelland-v1') ? ['Ga verder in je wereld', null] : null),
    rommelblok: () => { try { const o = JSON.parse(localStorage.getItem('rommelblok-v3') || 'null'); return o && o.laatste ? ['Ga verder met bouwen', null] : null; } catch (e) { return null; } },
  };
  // ---------- de kaarten verzamelen en verdelen
  const main = document.querySelector('main'); if (!main) return;
  const rijen = [...main.querySelectorAll('.haak-rij')].filter(r => r.querySelector('.label-kaart[href]') && !r.closest('.coulissen, #coulissen'));
  if (!rijen.length) return;
  const labels = [];
  rijen.forEach(r => r.querySelectorAll(':scope > .label').forEach(l => labels.push(l)));
  const perCat = Object.fromEntries(CATEGORIEEN.map(c => [c.id, []]));
  let nieuwste = null;
  for (const l of labels) {
    if (l.classList.contains('leeg')) { l.remove(); continue; }
    const a = l.querySelector('.label-kaart'), p = pagina(a), soort = (l.querySelector('.soort') || {}).textContent || '';
    let cat = CATEGORIEEN.find(c => c.paginas.includes(p)) || CATEGORIEEN.find(c => c.woorden.test(soort.toLowerCase() + ' ' + p)) || CATEGORIEEN[2];
    perCat[cat.id].push(l);
    if (l.querySelector('.stempel') && p !== 'ideeenbox') nieuwste = l;
  }
  // de oude koppen en rijen opruimen
  const eersteKop = rijen[0].previousElementSibling && rijen[0].previousElementSibling.tagName === 'H2' ? rijen[0].previousElementSibling : null;
  const plek = document.createElement('div'); plek.className = 'v8';
  (eersteKop || rijen[0]).before(plek);
  rijen.forEach(r => { const k = r.previousElementSibling; if (k && k.tagName === 'H2' && !k.closest('.coulissen')) k.remove(); r.remove(); });
  // ---------- menu
  const actief = CATEGORIEEN.filter(c => perCat[c.id].length);
  let h = `<nav class="v8-nav" aria-label="Categorieën">${actief.map(c => `<a href="#cat-${c.id}">${c.kort}</a>`).join('')}</nav>`;
  // ---------- verder spelen
  const verder = [];
  for (const l of labels) { const a = l.querySelector('.label-kaart'); if (!a || l.classList.contains('leeg')) continue; const p = pagina(a), f = VOORTGANG[p]; if (!f) continue; let v = null; try { v = f(); } catch (e) {} if (v) verder.push({ a, p, v }); }
  if (verder.length) h += `<section class="v8-verder" aria-labelledby="v8-verder-kop"><h2 id="v8-verder-kop"><span>Verder spelen</span></h2><div class="v8-verder-rij">${verder.map(({ a, v }) => `<a class="v8-mini" href="${a.getAttribute('href')}"><span class="v8-mini-icoon" data-icoon="${a.dataset.icoon || ''}"></span><span class="v8-mini-tekst"><b>${(a.querySelector('.naam') || {}).textContent || ''}</b><small>${v[0]}</small>${v[1] != null ? `<i><em style="width:${Math.round(Math.max(0.03, v[1]) * 100)}%"></em></i>` : ''}</span></a>`).join('')}</div></section>`;
  // ---------- uitgelicht: het nieuwste spel
  if (nieuwste) { const a = nieuwste.querySelector('.label-kaart'); h += `<section class="v8-uitgelicht" aria-label="Nieuw in het rommelhoekje"><a href="${a.getAttribute('href')}"><span class="v8-uit-icoon" data-icoon="${a.dataset.icoon || ''}"></span><span class="v8-uit-tekst"><span class="v8-uit-stempel">Nieuw in het rommelhoekje</span><b>${(a.querySelector('.naam') || {}).textContent || ''}</b><span>${(a.querySelector('p') || {}).textContent || ''}</span></span><span class="v8-uit-doe">${(a.querySelector('.doe') || {}).textContent || 'Probeer het'}</span></a></section>`; }
  plek.innerHTML = h;
  for (const c of actief) {
    const sec = document.createElement('section'); sec.className = 'v8-cat'; sec.id = 'cat-' + c.id;
    sec.innerHTML = `<h2><span>${c.naam}</span></h2>`;
    const rij = document.createElement('div'); rij.className = 'haak-rij v8-rij';
    perCat[c.id].forEach(l => rij.appendChild(l));
    sec.appendChild(rij); plek.appendChild(sec);
  }
  // ---------- iconen: altijd de nieuwste (de homepage zelf heeft soms nog een oude lijst)
  // ontbreekt een icoon, of heeft een oude kaart een verkeerde naam? Raad het aan de pagina
  const RADEN = { rommelcasino: 'casino', rommelgroepjes: 'groepjes', cryptisch: 'cryptisch', letterval: 'letterval', klinkermijnen: 'klinker', reclame: 'reclame', huisopstelten: 'huis', rubendeduiker: 'duiker', rommelland: 'pretpark', rommelblok: 'blok', vouwvlieger: 'vlieger', rommelritme: 'ritme', rommelkroon: 'rommelkroon', rommelarend: 'arend', rob: 'rob', rommelbel: 'bel', rommelsteek: 'steek', productiefiets: 'fiets', steigerstress: 'steiger', rommelwheels: 'wheels', mengelmoes: 'mengelmoes', opgevoel: 'opgevoel', rommelrecht: 'recht', rommelbeesten: 'pakje', rommelhotel: 'hotel', vlaaienbakker: 'vlaai', rommelpoker: 'kaarten', rommelwoord: 'woord', scorebord: 'beker', ideeenbox: 'idee' };
  document.querySelectorAll('.label-kaart[href]').forEach(a => { const g = RADEN[pagina(a)]; if (g && (typeof SPELICONEN === 'undefined' || !SPELICONEN[a.dataset.icoon] || a.dataset.icoon === 'doos')) a.dataset.icoon = g; });
  plek.querySelectorAll('[data-icoon]').forEach(s => { const a = labels.map(l => l.querySelector('.label-kaart')).find(x => x && x.getAttribute('href') === (s.closest('a') ? s.closest('a').getAttribute('href') : undefined)); if (a) s.dataset.icoon = a.dataset.icoon; });
  const vulIconen = () => {
    if (typeof SPELICONEN === 'undefined') return;
    document.querySelectorAll('.label:not(.leeg) .label-kaart').forEach(a => { let s = a.querySelector('.label-icoon'); if (!s) return; const n = SPELICONEN[a.dataset.icoon] ? a.dataset.icoon : 'doos'; s.innerHTML = '<svg viewBox="0 0 64 64" focusable="false">' + SPELICONEN[n] + '</svg>'; });
    document.querySelectorAll('.v8-mini-icoon, .v8-uit-icoon').forEach(s => { const n = SPELICONEN[s.dataset.icoon] ? s.dataset.icoon : 'doos'; s.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true">' + SPELICONEN[n] + '</svg>'; });
  };
  vulIconen(); document.addEventListener('DOMContentLoaded', vulIconen); addEventListener('load', vulIconen); setTimeout(vulIconen, 600);
  // ---------- voet
  const voet = document.querySelector('footer');
  if (voet && !voet.querySelector('.v8-links')) {
    const links = document.createElement('nav'); links.className = 'v8-links'; links.setAttribute('aria-label', 'Meer');
    links.innerHTML = '<a href="scorebord.html">Scorebord</a><a href="ideeenbox.html">Ideeënbox</a><button type="button" class="v8-koppel">Koppel je apparaten</button>';
    voet.prepend(links);
    links.querySelector('.v8-koppel').addEventListener('click', () => { if (window.Scorebord && Scorebord.koppel) Scorebord.koppel(); });
  }
  // kleine links naar het colofon, de privacyverklaring en de huisregels, naast het versienummer
  if (voet && !voet.querySelector('.v8-juridisch')) {
    const j = document.createElement('nav'); j.className = 'v8-juridisch'; j.setAttribute('aria-label', 'Over deze site');
    j.innerHTML = '<a href="colofon.html">Colofon</a><a href="privacy.html">Privacy</a><a href="huisregels.html">Huisregels</a>';
    const versie = voet.querySelector('.versie'); if (versie) versie.before(j); else voet.appendChild(j);
  }
  document.body.classList.add('v8-body');
  const st = document.createElement('style'); st.id = 'v8-stijl';
  st.textContent = `
    html, body.v8-body { overflow-x: hidden; overflow-x: clip; }
    .v8-body main { padding-top: 6vh; }
    .v8-body .held { margin-bottom: 1.4rem; }
    .v8-nav { position: sticky; top: 0; z-index: 20; display: flex; gap: .45rem; overflow-x: auto; padding: .6rem 0 .7rem; margin: 0 0 1.6rem; scrollbar-width: none; background: linear-gradient(var(--blauw, #2F4C8F) 70%, transparent); }
    .v8-nav::-webkit-scrollbar { display: none; }
    .v8-nav a { flex: 0 0 auto; font-weight: 800; font-size: .9rem; text-decoration: none; color: var(--inkt, #231A26); background: var(--manila, #F2DDA0); padding: .42rem .85rem; border-radius: 999px; box-shadow: 0 3px 0 rgba(0,0,0,.25); }
    .v8-nav a:hover, .v8-nav a:focus-visible { background: var(--papier, #FBF6E9); }
    .v8-cat, .v8-verder, .v8-uitgelicht { scroll-margin-top: 4.2rem; margin-bottom: 2.6rem; }
    .v8-body .v8-rij { display: grid; grid-template-columns: repeat(auto-fill, minmax(15.5rem, 1fr)); gap: 2.4rem 1.6rem; padding-top: 2.4rem; }
    .v8-body .v8-rij .label { width: auto; height: 100%; }
    .v8-body .v8-rij .label-kaart { height: 100%; display: flex; flex-direction: column; }
    .v8-body .v8-rij .label-kaart .doe { margin-top: auto; align-self: flex-start; }
    .v8-body .v8-rij .label-kaart p { margin-bottom: 1rem; }
    .v8-verder-rij { display: flex; gap: .8rem; overflow-x: auto; padding: 1rem .2rem .5rem; scrollbar-width: thin; }
    .v8-mini { flex: 0 0 auto; display: flex; gap: .65rem; align-items: center; min-width: 14rem; max-width: 17rem; background: var(--papier, #FBF6E9); color: var(--inkt, #231A26); text-decoration: none; border-radius: 10px; padding: .6rem .8rem; box-shadow: 0 4px 0 rgba(0,0,0,.28); }
    .v8-mini:hover, .v8-mini:focus-visible { transform: translateY(-2px); }
    .v8-mini-icoon { width: 2.8rem; height: 2.8rem; flex: 0 0 auto; } .v8-mini-icoon svg, .v8-uit-icoon svg { width: 100%; height: 100%; display: block; }
    .v8-mini-tekst { display: flex; flex-direction: column; gap: .15rem; min-width: 0; flex: 1; } .v8-mini-tekst b { font-size: 1rem; } .v8-mini-tekst small { font-size: .82rem; color: #5E5643; }
    .v8-mini-tekst i { display: block; height: .38rem; border-radius: 999px; background: #E2D8BE; overflow: hidden; margin-top: .15rem; } .v8-mini-tekst em { display: block; height: 100%; background: var(--rood, #C8323C); }
    .v8-uitgelicht a { display: grid; grid-template-columns: auto 1fr auto; gap: 1.2rem; align-items: center; text-decoration: none; color: var(--inkt, #231A26); background: linear-gradient(135deg, var(--manila, #F2DDA0), #F7E7B8); border-radius: 14px; padding: 1.1rem 1.4rem; box-shadow: 0 6px 0 rgba(0,0,0,.3); }
    .v8-uit-icoon { width: 5.2rem; height: 5.2rem; } .v8-uit-tekst { display: flex; flex-direction: column; gap: .2rem; } .v8-uit-tekst b { font-size: 1.6rem; line-height: 1.1; }
    .v8-uit-stempel { align-self: flex-start; background: var(--rood, #C8323C); color: #fff; font-weight: 800; font-size: .75rem; letter-spacing: .04em; text-transform: uppercase; padding: .15rem .55rem; border-radius: 3px; transform: rotate(-1.5deg); }
    .v8-uit-doe { font-weight: 800; background: var(--rood, #C8323C); color: #fff; padding: .6rem 1rem; border-radius: 8px; box-shadow: 0 3px 0 rgba(0,0,0,.3); white-space: nowrap; }
    .v8-uitgelicht a:hover .v8-uit-doe, .v8-uitgelicht a:focus-visible .v8-uit-doe { background: #A8162B; }
    .v8-links { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-right: auto; }
    .v8-juridisch { display: flex; gap: .8rem; flex-wrap: wrap; align-items: center; font-size: .8rem; }
    .v8-juridisch a { color: var(--manila, #F2DDA0); font-weight: 600; text-underline-offset: 3px; opacity: .9; }
    .v8-juridisch a:hover, .v8-juridisch a:focus-visible { opacity: 1; }
    .v8-links a, .v8-links button { color: var(--manila, #F2DDA0); font: inherit; font-weight: 700; font-size: .9rem; background: none; border: 0; padding: 0; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
    .v8-body .kp-knopje { display: none; }
    @media (max-width: 700px) {
      .v8-body .rek.zijkant { display: none; }
      .v8-body .rek-held { min-height: 11.5rem; margin-top: 0; }
      .v8-body .v8-nav { margin-bottom: 1.2rem; }
      .v8-body .held-rij { gap: 1rem; }
      .v8-body .v8-rij { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.8rem .8rem; padding-top: 2rem; }
      .v8-body .v8-rij .label-kaart p { display: none; }
      .v8-body .v8-rij .label-icoon { width: 3.2rem; height: 3.2rem; }
      .v8-body .v8-rij .label-kaart .naam { font-size: 1.1rem; }
      .v8-body .v8-rij .label-kaart .doe { font-size: .8rem; }
      .v8-uitgelicht a { grid-template-columns: auto 1fr; } .v8-uit-doe { grid-column: 1 / -1; text-align: center; } .v8-uit-icoon { width: 3.8rem; height: 3.8rem; } .v8-uit-tekst b { font-size: 1.3rem; }
    }
    @media (prefers-reduced-motion: reduce) { .v8-mini:hover { transform: none; } }
  `;
  document.head.appendChild(st);
  window.__v8 = { perCat, verder: verder.length };
})();

})();
;(function () {
(function () {
  try { const h = sessionStorage.getItem('koppel-herstel'); if (h) { const d = JSON.parse(h); for (const [k, v] of Object.entries(d)) { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); }
    // welke versie van de server nu op dit apparaat staat (zie koppelSync), zodat de volgende keer gewoon verder gaat
    const v = JSON.parse(sessionStorage.getItem('koppel-herstel-v') || 'null'), K = JSON.parse(localStorage.getItem('rommelhoekje-koppel') || 'null');
    if (v && K && K.code === v.code) { K.staat = Object.assign(K.staat || {}, v.staat || {}); localStorage.setItem('rommelhoekje-koppel', JSON.stringify(K)); }
    sessionStorage.removeItem('koppel-herstel'); sessionStorage.removeItem('koppel-herstel-v'); if (!['koppel-hulp', 'koppel-vervangen', 'koppel-samen', 'koppel-geweigerd', 'koppel-opnieuw', 'koppel-terug'].some(x => sessionStorage.getItem(x))) sessionStorage.setItem('koppel-melding', '1'); } } catch (e) {}
})();
(function () {
  // rommelhoekje-speler: gedeeld door alle pagina's van de site (zelfde adres = zelfde opslag)
  const SKEY = 'rommelhoekje-speler';
  let speler = null;
  try { speler = JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch (e) { speler = null; }
  const bewaar = () => { try { if (speler) localStorage.setItem(SKEY, JSON.stringify(speler)); else localStorage.removeItem(SKEY); } catch (e) {} };

  // instellingen.json staat in de map van de site en wordt door de werkplaats beheerd
  const klaar = fetch('instellingen.json?' + Math.floor(Date.now() / 600000), { cache: 'no-cache' })
    .then(r => (r.ok ? r.json() : {})).catch(() => ({}))
    .then(inst => {
      inst = inst || {};
      // bezoekersteller van Cloudflare: geen cookies, geen persoonsgegevens
      if (inst.analyticsToken && /^[a-f0-9]{16,64}$/i.test(inst.analyticsToken) && !document.querySelector('script[src*="cloudflareinsights"]')) {
        const s = document.createElement('script');
        s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js?token=' + encodeURIComponent(inst.analyticsToken);
        document.head.appendChild(s);
      }
      return inst;
    });
  const adres = inst => (inst.scoreUrl || '').replace(/\/+$/, '');
  function nieuwGeheim() {
    if (window.crypto && crypto.getRandomValues) { const a = new Uint8Array(18); crypto.getRandomValues(a); return [...a].map(b => b.toString(16).padStart(2, '0')).join(''); }
    return Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  async function mijnId() {
    if (!speler || !window.crypto || !crypto.subtle) return null;
    const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('rommelhoekje:' + speler.geheim));
    return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
  }
  const laatst = {};
  // ---------- alle spellen bijwerken, vanaf elke pagina van de site
  // Elk spel bewaart zijn beste score in deze browser. Doe je mee, dan sturen we die vanzelf door,
  // ook als je niet op de scorebordpagina komt. Alleen wat nieuw of beter is, gaat de deur uit.
  const lees = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  // De Vlaaienbakker: een getal boven 10^300 staat in zijn opslag op dat plafond, en precies als tekst in s.groot[pad] ("4.2e400").
  // vbLog geeft de 10-log (0 of niets: -Infinity), net als de scoreserver.
  const vbLog = (s, pad) => {
    if (!s) return -Infinity;
    const P = pad.startsWith('gilde.') ? 1e270 : 1e300, x = pad.split('.').reduce((o, k) => (o == null ? undefined : o[k]), s);
    const r = s.groot && /^\s*(\d+(?:\.\d+)?)(?:e([+-]?\d+))?\s*$/i.exec(String(s.groot[pad] || '')), g = r && parseFloat(r[1]) > 0 ? Math.log10(parseFloat(r[1])) + (r[2] ? parseInt(r[2], 10) : 0) : NaN;
    if (typeof x !== 'number' || !isFinite(x)) return isFinite(g) ? g : -Infinity;
    if (isFinite(g) && x >= P / 1e20) return g;
    return x > 0 ? Math.log10(x) : -Infinity;
  };
  // spellen die hun score als 10-log sturen, en borden die een oude scoreserver nog niet kent (dan zeggen we niets)
  const LOG_SPEL = { vlaai: 1 }, NIEUW_BORD = { oerknal: 1, vbpres: 1, kroonklok: 1, casino: 1, cryptisch: 1, letterval: 1, klinker: 1 };
  const vkey = spel => (LOG_SPEL[spel] ? spel + '~log' : spel);
  // de woordspellen (2026-11-06): je beste reeks (dagen op rij gelukt) en hoe vaak in één keer goed (het teken 1 of A)
  const woordBron = k => { const s = lees(k), d = s && typeof s.d === 'string' ? s.d : ''; let b = 0, r = 0, een = 0; for (const x of d) { if (/[0-9A-I]/.test(x)) { r++; b = Math.max(b, r); if (x === '1' || x === 'A') een++; } else r = 0; } return b ? [b, een] : null; };
  const BRONNEN = {
    cryptisch: () => woordBron('cryptisch-v1'), letterval: () => woordBron('letterval-v1'), klinker: () => woordBron('klinkermijnen-v1'),
    // Casino Rommelroyaal: alle punten van de hand van de dag (elke dag hooguit 100), en je beste week (de week begint op maandag)
    casino: () => { const s = lees('rommelcasino-v1'); if (!s || !s.dag || typeof s.dag !== 'object') return null; let t = 0; const w = {}; for (const [d, x] of Object.entries(s.dag)) { const p = Array.isArray(x) ? Math.max(0, Math.min(100, Math.round(+x[0] || 0))) : 0; t += p; const W = Math.floor((+d + 3) / 7); w[W] = (w[W] || 0) + p; } return t ? [t, Math.max(0, ...Object.values(w))] : null; },
    gevoel: () => { const s = lees('opgevoel-v1'); return s && s.stat && s.stat.dag && s.stat.dag.best ? [s.stat.dag.best, (s.reeks && s.reeks.lengte) || 0] : null; },
    groepjes: () => { const s = lees('rommelgroepjes-v1'); if (!s || !s.p) return null; let b = 0, r = 0, v = -9, z = 0; for (const d of Object.keys(s.p).map(Number).filter(n => n > 0).sort((a, c) => a - c)) { const x = String(s.p[d]); if (x[0] === 'w') { r = d === v + 1 ? r + 1 : 1; v = d; b = Math.max(b, r); } if ((x[0] === 'w' || x[0] === 'a') && x[1] === '0') z++; } return b ? [b, z] : null; },
    reclame: () => { const s = lees('reclame-v1'); if (!s || !s.s) return null; let n = 0; for (const v of Object.values(s.s)) for (const c of String(v)) n += Math.min(3, +c || 0); return n ? [n, (s.dag && s.dag.b) || 0] : null; },
    huis: () => { const s = lees('huisopstelten-v1'); return s && s.besteDag > 0 ? [Math.round(s.besteDag), Object.values(s.k || {}).reduce((n, k) => n + ((k && k.s) || []).filter(Boolean).length, 0)] : null; },
    duiker: () => { const s = lees('rubendeduiker-v1'); return s && s.beste && s.beste.avond > 0 ? [Math.round(s.beste.avond), Object.keys(s.boek || {}).length] : null; },
    wheels: () => { const s = lees('rommelwheels-v1'); if (!s || !s.levels) return null; let p = 0, st = 0; for (const r of Object.values(s.levels)) { p += r.punten || 0; st += (r.gehaald ? 1 : 0) + (r.alle ? 1 : 0) + (r.heel ? 1 : 0); } return p ? [p, st] : null; },
    vlaai: () => { const s = lees('vlaaienbakker-v1'), L = vbLog(s, 'totaal'); return L >= 0 ? [L, Math.max(0, vbLog(s, 'vpsNu'))] : null; },
    oerknal: () => { const s = lees('vlaaienbakker-v1'), o = s && s.oer; return o && o.n > 0 ? [Math.floor(Math.pow(10, Math.min(15, vbLog(s, 'oer.ooit')))), o.n] : null; },
    vbpres: () => { const s = lees('vlaaienbakker-v1'); return s && Array.isArray(s.pres) && s.pres.length ? [s.pres.length, s.mijl || 0] : null; },
    woord: () => { const s = lees('rommelwoord-stats-v1'); return s && s.besteReeks > 0 ? [s.besteReeks, s.gewonnen || 0] : null; },
    poker: () => { const s = lees('rommelpoker-record'); return s && s.verst > 0 ? [s.verst, Math.round(s.beste || 0)] : null; },
    bel: () => { const s = lees('rommelbel-v1'); return s && s.eindeloos ? [s.eindeloos, Object.values(s.sterren || {}).reduce((a, b) => a + b, 0)] : null; },
    rob: () => { const s = lees('rommelrob-v1'); return s && s.best ? [s.best, s.totaal || 0] : null; },
    arend: () => { const s = lees('rommelarend-v1'); if (!s) return null; const p = (s.ontdekt || []).length * 100 + (s.veren || []).length * 25 + Object.values(s.races || {}).reduce((a, r) => a + ({ goud: 300, zilver: 200, brons: 100 }[r.medaille] || 0), 0); return p ? [p, (s.ontdekt || []).length] : null; },
    kroon: () => { const s = lees('rommelkroon-v1'); if (!s || !s.opgelost) return null; const o = Object.values(s.opgelost); return o.length ? [Math.min(1000, o.length), o.reduce((a, x) => a + x.tijd, 0)] : null; },
    kroonklok: () => { const s = lees('rommelkroon-v1'), k = s && s.klok; return k && k.b > 0 ? [Math.min(200, k.b), k.n || 0] : null; },
    ritme: () => { const s = lees('rommelritme-v1'); if (!s || !s.best) return null; const som = Object.values(s.best).reduce((a, b) => a + b, 0); return som > 0 ? [som, Object.values(s.pogingen || {}).reduce((a, b) => a + b, 0)] : null; },
    vlieger: () => { const s = lees('vouwvlieger-v1'); return s && s.best > 0 ? [s.best, s.sterren || 0] : null; },
    beest: () => { const s = lees('rommelbeesten-v1'); if (!s || !s.bezit) return null; let u = 0, t = 0; for (const [id, b] of Object.entries(s.bezit)) { const n = (b[0] || 0) + (b[1] || 0); t += n; if (n > 0 && /^zs/.test(id)) u++; } return u ? [u, t] : null; },
  };
  const VKEY = 'rommelhoekje-verstuurd';
  const onthoud = (spel, score, extra) => { const v = lees(VKEY) || {}, k = vkey(spel); const o = v[k]; if (!o || o.naam !== speler.naam || score > o.s || (score === o.s && extra > o.e)) { v[k] = { s: score, e: extra, naam: speler.naam }; try { localStorage.setItem(VKEY, JSON.stringify(v)); } catch (e) {} } };
  let bezig = false;
  async function synchroniseer() {
    if (bezig || !speler || !speler.naam) return; bezig = true;
    try {
      const inst = await klaar; if (!adres(inst)) return;
      const v = lees(VKEY) || {};
      for (const [spel, bron] of Object.entries(BRONNEN)) {
        let w = null; try { w = bron(); } catch (e) {}
        if (!w) continue;
        const o = v[vkey(spel)];
        if (o && o.naam === speler.naam && o.s >= w[0] && o.e >= w[1]) continue;
        await API.stuur(spel, w[0], w[1]);
      }
    } finally { bezig = false; }
  }

  const API = {
    klaar,
    actief: () => klaar.then(inst => !!adres(inst)),
    doetMee: () => !!(speler && speler.naam),
    naam: () => (speler && speler.naam) || '',
    mijnId,
    // meedoen of je naam veranderen; een lege naam = stoppen
    async zetNaam(naam) {
      naam = String(naam || '').replace(/\s+/g, ' ').trim().slice(0, 16);
      if (!naam) { speler = null; bewaar(); return { ok: true }; }
      const bestond = !!(speler && speler.geheim);
      speler = { geheim: (speler && speler.geheim) || nieuwGeheim(), naam };
      bewaar();
      let uitslag = { ok: true };
      const inst = await klaar;
      if (bestond && adres(inst)) {
        try { const r = await metTijd(adres(inst) + '/naam', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ geheim: speler.geheim, naam }) }); const j = await r.json().catch(() => ({})); if (!r.ok) { uitslag = { ok: false, fout: j.fout || 'Naam veranderen lukte niet.' }; document.dispatchEvent(new CustomEvent('scorebord-fout', { detail: uitslag.fout })); } } catch (e) {}
      }
      document.dispatchEvent(new CustomEvent('scorebord-naam'));
      for (const [spel, w] of Object.entries(laatst)) { delete laatst[spel]; await API.stuur(spel, w[0], w[1], true); }
      await synchroniseer();
      return uitslag;
    },
    // een score insturen (de server bewaart alleen je beste). De Vlaaienbakker stuurt de 10-log (LOG_SPEL): dan gaat ook het gewone getal
    // mee (hooguit 10^300), zodat een oudere scoreserver hem nog aanneemt.
    async stuur(spel, score, extra, direct) {
      laatst[spel] = [score, extra || 0];
      if (!API.doetMee()) return null;
      const inst = await klaar; if (!adres(inst)) return null;
      const rauw = L => (L < 15 ? Math.round(Math.pow(10, L)) : Math.pow(10, Math.min(300, L)));
      const lijf = LOG_SPEL[spel] ? { spel, naam: speler.naam, geheim: speler.geheim, score: rauw(score), extra: rauw(extra || 0), log: score, elog: extra || 0 } : { spel, naam: speler.naam, geheim: speler.geheim, score, extra: extra || 0 };
      try {
        const r = await metTijd(adres(inst) + '/score', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, keepalive: true, body: JSON.stringify(lijf) });
        const j = await r.json().catch(() => ({}));
        if (r.ok) onthoud(spel, score, extra || 0);
        if (!r.ok && j.fout && !NIEUW_BORD[spel] && !/^[kc]w\d/.test(spel)) document.dispatchEvent(new CustomEvent('scorebord-fout', { detail: j.fout }));
        return r.ok ? j : null;
      } catch (e) { return null; }
    },
    async lijsten() {
      const inst = await klaar; if (!adres(inst)) return null;
      const r = await metTijd(adres(inst) + '/scores', { cache: 'no-store' });
      return r.ok ? r.json() : null;
    },
    async stopEnVerwijder() {
      const inst = await klaar;
      if (speler && adres(inst)) { try { await metTijd(adres(inst) + '/verwijder', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ geheim: speler.geheim }) }); } catch (e) {} }
      speler = null; bewaar();
      document.dispatchEvent(new CustomEvent('scorebord-naam'));
    },
    // een klein blokje om mee te doen, voor in een spel
    async blokje(el, wat) {
      if (!el) return;
      el.dataset.sbWat = wat || 'je score';
      if (!(await API.actief())) { el.hidden = true; return; }
      tekenBlok(el);
    },
    // een nep-advertentie voor een ander spel van het rommelhoekje (banners.js), voor een rustig moment zoals het eindscherm.
    // Een spel roept dit zelf aan; de ruimte wordt meteen vrijgehouden. Opties (zie banners.js): vorm ('blok', 'hoog' of 'lijst'),
    // niet (pagina's die niet mogen), soms (hooguit eens per 10 minuten), wissel (false: niet rouleren).
    banner(el, opties) {
      if (!el) return;
      opties = opties || {};
      const pagina = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      if (opties.soms) { try { const g = JSON.parse(localStorage.getItem('rommelbanner-v1') || '{}'), t = g && g.e && g.e[pagina]; if (t && Date.now() - t < 6e5 && Date.now() >= t) return; } catch (e) {} }
      if (!el.style.height) { const w = el.clientWidth || 300, v = opties.vorm || (w >= 744 ? 'balk' : 'blok'); el.style.minHeight = (v === 'balk' ? 108 : v === 'hoog' ? 618 : v === 'lijst' ? 232 : 268) + 'px'; }
      const ga = () => { if (window.RommelBanner) window.RommelBanner.toon(el, opties); else el.style.minHeight = ''; };
      if (window.RommelBanner) return ga();
      if (!bannerLaad) bannerLaad = new Promise(ok => { const s = document.createElement('script'); s.src = 'banners.js'; s.async = true; s.onload = ok; s.onerror = ok; document.head.appendChild(s); });
      bannerLaad.then(ga);
    },
  };
  let bannerLaad = null;
  function tekenBlok(el) {
    el.hidden = false; el.innerHTML = '';
    el.classList.add('sb-blok');
    const p = document.createElement('p');
    if (API.doetMee()) {
      p.innerHTML = 'Je doet mee aan het <a href="scorebord.html">scorebord</a> als <b></b>.';
      p.querySelector('b').textContent = speler.naam;
      el.appendChild(p);
      return;
    }
    p.textContent = 'Zet ' + el.dataset.sbWat + ' op het scorebord van het rommelhoekje. Kies een naam:';
    const f = document.createElement('form'); f.className = 'sb-mee';
    f.innerHTML = '<input maxlength="16" placeholder="Je naam" aria-label="Je naam voor het scorebord" autocomplete="nickname"><button type="submit">Doe mee</button>';
    f.addEventListener('submit', async e => { e.preventDefault(); const n = f.querySelector('input').value.trim(); if (n.length < 2) { f.querySelector('input').focus(); return; } await API.zetNaam(n); });
    const k = document.createElement('small'); k.textContent = 'We bewaren alleen je naam en je beste score. Je kunt altijd stoppen op de scorebordpagina.';
    el.appendChild(p); el.appendChild(f); el.appendChild(k);
  }
  document.addEventListener('scorebord-naam', () => document.querySelectorAll('[data-sb-wat]').forEach(el => { if (!el.hidden) tekenBlok(el); }));
  // stijl voor het blokje, met de kleuren van de site
  const st = document.createElement('style');
  st.textContent = '.sb-blok{background:var(--papier,#FBF6E9);color:var(--inkt,#1F2333);border-radius:8px;padding:.6rem .8rem;margin-top:.8rem;font-size:.92rem;line-height:1.4;text-align:left}.sb-blok p{margin:0 0 .4rem}.sb-blok p:last-child{margin:0}.sb-blok a{color:var(--rood-d,#9E2430);font-weight:700}.sb-mee{display:flex;gap:.4rem;flex-wrap:wrap}.sb-mee input{flex:1 1 8rem;min-width:0;font:inherit;padding:.4rem .6rem;border-radius:6px;border:2px solid var(--manila-d,#D9BE78);background:#fff}.sb-mee button{font:inherit;font-weight:700;border:0;border-radius:6px;padding:.4rem .8rem;background:var(--rood,#C8323C);color:#fff;cursor:pointer}.sb-blok small{display:block;color:var(--zacht,#5E5643);margin-top:.35rem;font-size:.78rem}';
  document.head.appendChild(st);

  // ==== REGELS begin
  // De regels voor het koppelen: hoe twee versies van een spel samengaan. Deze tekst staat letterlijk hetzelfde in het gedeelde
  // scorebord-blok van de site en in de scoreserver (de controle van de gedeelde blokken kijkt dat na). Verander hem dus altijd op allebei.
  //   b = de gezamenlijke basis (de laatste versie waar beide apparaten het over eens waren; mag ontbreken),
  //   s = wat de server al had (dat kwam eerst binnen), i = wat er nu binnenkomt (dat kwam later).
  // De soorten regels: samen (wat op een van de twee gehaald is, blijft), beste (hoogste of snelste), teller (wat er op elk apparaat bij
  // kwam, telt op; zonder basis de hoogste), keuze (een instelling: de laatste verandering wint), lopend (iets dat nog bezig is: de laatste
  // versie, nooit gemengd), eerste (dagpuzzels: de eerste uitslag van een dag telt) en geheel (één hele versie wint: die met de meeste
  // voortgang). Nooit geld, muntjes, kaarten of spullen samenvoegen: dan zou je iets kunnen verdubbelen. Een nieuw spel? Zet het in SPEL.
  const REGELS = (() => {
    const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
    const getal = (x, d = 0) => (typeof x === 'number' && isFinite(x) ? x : d);
    const lijst = x => (Array.isArray(x) ? x : []);
    const aantal = o => (isObj(o) ? Object.keys(o).length : 0);
    const som = o => (isObj(o) ? Object.values(o).reduce((a, x) => a + getal(x), 0) : 0);
    // hetzelfde, ook als de velden in een andere volgorde staan
    const zelfde = (a, b) => { if (a === b) return true; if (typeof a !== typeof b || !a || !b || typeof a !== 'object') return false; if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((x, k) => zelfde(x, b[k])); if (Array.isArray(b)) return false; const ka = Object.keys(a).filter(k => a[k] !== undefined), kb = Object.keys(b).filter(k => b[k] !== undefined); return ka.length === kb.length && ka.every(k => zelfde(a[k], b[k])); };
    const num = x => typeof x === 'number' && isFinite(x);
    // ---------- de soorten regels, voor één waarde
    const keuze = (b, s, i, c) => (!c.basis ? (i === undefined ? s : i) : zelfde(i, b) ? s : zelfde(s, b) ? i : i);
    const lopend = keuze;
    const eerste = (b, s, i) => (s === undefined ? i : s);
    const max = (b, s, i) => (num(s) && num(i) ? Math.max(s, i) : num(i) ? i : num(s) ? s : i === undefined ? s : i);
    // de snelste tijd: alleen getallen boven 0 tellen (0 betekent: nog geen tijd)
    const snelste = (b, s, i) => { const g = [s, i].filter(x => num(x) && x > 0); return g.length ? Math.min(...g) : i === undefined ? s : i; };
    const teller = (b, s, i, c) => (!num(s) || !num(i) ? max(b, s, i) : c.basis && num(b) && b <= s && b <= i ? s + i - b : Math.max(s, i));
    // een saldo dat op en neer gaat (alleen met een basis: wat er op elk apparaat bij kwam en af ging); zonder basis: niets (dan geheel)
    const saldo = (b, s, i, c) => (c.basis && num(b) && num(s) && num(i) ? s + i - b : undefined);
    const of = (b, s, i) => (s ? s : i ? i : i === undefined ? s : i);
    const samenLijst = (b, s, i, c) => (Array.isArray(s) && Array.isArray(i) ? [...new Set([...s, ...i])] : keuze(b, s, i, c));
    // ---------- een object veld voor veld: per veld een regel (of een object met regels), '*' voor alle andere velden
    function pas(regel, b, s, i, c) { return typeof regel === 'function' ? regel(b, s, i, c) : velden(regel, b, s, i, c); }
    function velden(schema, b, s, i, c) {
      if (!isObj(s) || !isObj(i)) return keuze(b, s, i, c);
      const bb = isObj(b) ? b : {}, r = {};
      for (const k of new Set([...Object.keys(s), ...Object.keys(i)])) {
        const regel = k in schema ? schema[k] : '*' in schema ? schema['*'] : keuze;
        const v = pas(regel, bb[k], s[k], i[k], c);
        if (v !== undefined) r[k] = v;
      }
      return r;
    }
    const elk = regel => ({ '*': regel });
    // ---------- hulpjes voor een paar spellen
    // Rommelpoker: ontdekt staat als een rijtje bitjes in base64 (6 per teken, nieuwe dingen achteraan)
    const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const bitjes = (b, s, i, c) => {
      if (typeof s !== 'string' || typeof i !== 'string' || /[^A-Za-z0-9_-]/.test(s + i)) return keuze(b, s, i, c);
      let r = ''; for (let k = 0; k < Math.max(s.length, i.length); k++) r += B64[Math.max(0, B64.indexOf(s[k] || 'A')) | Math.max(0, B64.indexOf(i[k] || 'A'))];
      return r.replace(/A+$/, '');
    };
    // Rommelsteek: een patroon als rijtje 0 en 1 (een steekje gaat nooit weg)
    const steekjes = (b, s, i, c) => (typeof s === 'string' && typeof i === 'string' && s.length === i.length && /^[01]+$/.test(s + i) ? Array.from(s, (x, k) => (x === '1' || i[k] === '1' ? '1' : '0')).join('') : keuze(b, s, i, c));
    // Zoals in de reclame: de sterren van een spelletje als rijtje cijfers (0 tot 3), per level de meeste
    const cijfers = (b, s, i, c) => {
      if (typeof s !== 'string' || typeof i !== 'string' || /[^0-3]/.test(s + i)) return keuze(b, s, i, c);
      let r = ''; for (let k = 0; k < Math.max(s.length, i.length); k++) r += String(Math.max(+(s[k] || 0), +(i[k] || 0)));
      return r.replace(/0+$/, '');
    };
    // dezelfde dag op twee apparaten gespeeld: dan telt een teller voor die dag maar één keer
    const dagTeller = (b, s, i, c, zelfdeNieuweDag) => { const t = teller(b, s, i, c); return num(t) && c.basis && num(b) && zelfdeNieuweDag ? Math.max(t - 1, getal(s), getal(i)) : t; };
    const MEDAILLE = { goud: 3, zilver: 2, brons: 1 };
    const VV_PRIJS = { wit: 0, krant: 25, kraan: 50, neon: 90, goud: 150, regenboog: 300, startvouw: 40, magneet: 70, dubbel: 140 };
    // Mengelmoes: dezelfde naam is dezelfde sticker (zoals norm() in het spel)
    const mmNaam = x => String(x || '').normalize('NFKC').toLocaleLowerCase('nl').trim().replace(/\s+/g, ' ');
    // de Vlaaienbakker: een getal boven 10^300 staat als tekst in groot[pad]; als 10-log (zoals vbLog in de scoreserver)
    const vlog = (s, pad) => {
      const x = pad.split('.').reduce((o, k) => (o == null ? undefined : o[k]), s), P = pad.startsWith('gilde.') ? 1e270 : 1e300;
      const r = s && s.groot && /^\s*(\d+(?:\.\d+)?)(?:e([+-]?\d+))?\s*$/i.exec(String(s.groot[pad] || '')), g = r && parseFloat(r[1]) > 0 ? Math.log10(parseFloat(r[1])) + (r[2] ? parseInt(r[2], 10) : 0) : NaN;
      if (!num(x)) return isFinite(g) ? g : 0;
      if (isFinite(g) && x >= P / 1e20) return g;
      return x > 0 ? Math.max(0, Math.log10(x)) : 0;
    };
    const rbHeb = x => (Array.isArray(x) ? getal(x[0]) + getal(x[1]) : 0);
    // Rommelkroon: per puzzel de beste keer (minder hints, dan sneller); per dag (en per week) liefst de keer die op de dag (of in de week)
    // zelf was, dan de snelste. 'Op de dag zelf' blijft aan als het één keer aan stond.
    const kroonBest = (b, s, i) => { if (!isObj(s) || !isObj(i)) return isObj(s) ? s : i; const hs = getal(s.hints, 99), hi = getal(i.hints, 99); return hi < hs || (hi === hs && getal(i.tijd, 1e12) < getal(s.tijd, 1e12)) ? i : s; };
    // Casino Rommelroyaal: een rijtje tellers (zoals rondes, ingezet en terug), per plek een teller
    const tellers = (b, s, i, c) => (Array.isArray(s) && Array.isArray(i) ? Array.from({ length: Math.max(s.length, i.length) }, (x, k) => teller(lijst(b)[k], getal(s[k]), getal(i[k]), c)) : keuze(b, s, i, c));
    const kroonDag = (b, s, i) => { if (!Array.isArray(s) || !Array.isArray(i)) return Array.isArray(s) ? s : i; const w = getal(i[2]) > getal(s[2]) || (getal(i[2]) === getal(s[2]) && getal(i[0], 1e12) < getal(s[0], 1e12)) ? i : s; const r = w.slice(); r[2] = Math.max(getal(s[2]), getal(i[2])); return r; };
    // De woordspellen (2026-11-06): Rommelwoord (4 tot en met 8 letters), Cryptisch, Letterval en Klinkermijnen. Per spel (en per lengte) één
    // teken per dag, dag 0 is 8 oktober 2026: '.' niet gespeeld, 1-9 gelukt, A-I gelukt in de moeilijke stand, 0 gelukt van vóór de nieuwe
    // spellen (uit een lopende reeks), x en X niet gelukt. Per dag telt de eerste uitslag; een 0 maakt plaats voor een echte uitslag.
    const woordDagen = (b, s, i, c) => {
      if (typeof s !== 'string' || typeof i !== 'string' || /[^.0-9A-IxX]/.test(s + i)) return keuze(b, s, i, c);
      let r = '';
      for (let k = 0; k < Math.max(s.length, i.length); k++) { const x = s[k] || '.', y = i[k] || '.'; r += x === '.' ? y : y === '.' ? x : x === '0' && y !== '0' ? y : x; }
      return r.replace(/\.+$/, '');
    };
    // Letterval: de hints die je per dag gebruikte, een cijfer per dag. Per dag de meeste: zo komen er door het koppelen nooit hints bij
    // (het potje rekent het spel uit: 3, plus de dagen die je oploste, min alle gebruikte hints).
    const hintDagen = (b, s, i, c) => {
      if (typeof s !== 'string' || typeof i !== 'string' || /[^0-9]/.test(s + i)) return keuze(b, s, i, c);
      let r = ''; for (let k = 0; k < Math.max(s.length, i.length); k++) r += String(Math.max(+(s[k] || 0), +(i[k] || 0)));
      return r.replace(/0+$/, '');
    };
    const woordMaat = x => { const t = typeof x === 'string' ? x : ''; return [(t.match(/[0-9A-I]/g) || []).length, (t.match(/[^.]/g) || []).length]; };
    // een spel dat nog loopt, op een dag die al een uitslag heeft, is klaar; van de tijden per dag blijven de laatste 120 dagen
    const woordNa = r => {
      if (isObj(r.bezig) && typeof r.d === 'string' && (r.d[getal(r.bezig.dag, -1)] || '.') !== '.') r.bezig = null;
      if (isObj(r.t)) { const d = Object.keys(r.t).sort((a, b) => a - b); for (const k of d.slice(0, Math.max(0, d.length - 120))) delete r.t[k]; }
      return r;
    };
    // ---------- de maat: hoe verder, hoe hoger (dezelfde maat als 'Verder spelen' op de homepage); bij gelijke stand telt het volgende getal
    const MAAT = {
      // de Vlaaienbakker: opnieuw begonnen, oerdeeg, Oerknallen, hoe vaak je aan het gilde verkocht, alles wat je ooit bakte, deze ronde.
      // Een verkoop aan het gilde zet deze ronde op 0: zonder de verkopen telde dat als achteruit, en zette de server de verkoop terug.
      'vlaaienbakker-v1': s => { const o = isObj(s.oer) ? s.oer : {}, g = isObj(s.gilde) ? s.gilde : {}; return [getal(s.opnieuw), vlog(s, 'oer.ooit'), getal(o.n), getal(g.resets), Math.max(vlog(s, 'alles'), vlog(s, 'ooit'), vlog(s, 'totaal')), vlog(s, 'totaal')]; },
      'vlaaienbakker-week-v1': s => [getal(s.week), getal(s.totaal)],
      'rommelbeesten-v1': s => { const b = isObj(s.bezit) ? Object.values(s.bezit) : []; return [b.filter(x => rbHeb(x) > 0).length, b.reduce((a, x) => a + rbHeb(x), 0), getal((s.stats || {}).pakjes)]; },
      'rommelkroon-v1': s => [aantal(s.opgelost), aantal(s.dag), aantal(s.bezig)],
      'rommelrecht-v1': s => [Object.keys(isObj(s.gehaald) ? s.gehaald : {}).filter(k => !k.startsWith('dag-')).length, Object.values(isObj(s.manieren) ? s.manieren : {}).reduce((a, m) => a + lijst(m).length, 0), aantal(s.dag)],
      'rommelarend-v1': s => [lijst(s.ontdekt).length, lijst(s.veren).length, Object.values(isObj(s.races) ? s.races : {}).reduce((a, r) => a + ((r && MEDAILLE[r.medaille]) || 0), 0)],
      'rommelbel-v1': s => [som(s.sterren), getal(s.eindeloos), getal(s.open)],
      'rommelritme-v1': s => [som(s.best), aantal(s.gehaald), som(s.pogingen)],
      'rommelsteek-v1': s => [Object.keys(isObj(s.af) ? s.af : {}).filter(k => !/^dag/.test(k)).length, aantal(s.af), Object.values(isObj(s.werk) ? s.werk : {}).reduce((a, w) => a + (String(w).split('1').length - 1), 0)],
      'rommelwheels-v1': s => { let st = 0, p = 0; for (const r of Object.values(isObj(s.levels) ? s.levels : {})) { if (!r) continue; st += (r.gehaald ? 1 : 0) + (r.alle ? 1 : 0) + (r.heel ? 1 : 0); p += getal(r.punten); } return [st, p, getal(s.gespeeld)]; },
      'rommelhotel-v1': s => { const v = isObj(s.verhaal) ? s.verhaal : {}; return [aantal(v.opgelost), getal(v.stap), lijst(s.badges).length, getal(s.munten)]; },
      'rommelpoker-record': s => [getal(s.verst), getal(s.beste)],
      'rommelpoker-spel-v2': s => [getal(s.i), getal(s.score)],
      'rommelwoord-stats-v1': s => [getal(s.gespeeld) || getal(s.played), getal(s.gewonnen) || getal(s.won)],
      'rommelwoord-dag-v1': s => [getal(s.dag), s.klaar ? 1 : 0, lijst(s.pogingen).length],
      'vouwvlieger-v1': s => [getal(s.sterren), getal(s.best), getal(s.gespeeld)],
      'rommelrob-v1': s => [getal(s.totaal), getal(s.best)],
      'productiefiets-v1': s => [getal(s.gespeeld), getal(s.bestMeter), getal(s.best)],
      'steiger-v1': s => [som(s.sterren), som(s.scores)],
      'mengelmoes-v1': s => [lijst(s.el).length],
      'opgevoel-v1': s => [aantal(s.dagen), Object.values(isObj(s.records) ? s.records : {}).reduce((a, r) => a + getal(r && r.n), 0)],
      'rubendeduiker-v1': s => [getal(s.hfd), getal(s.dag), aantal(s.boek)],
      'huisopstelten-v1': s => [Object.values(isObj(s.k) ? s.k : {}).reduce((a, k) => a + (isObj(k) ? lijst(k.s).filter(Boolean).length : 0), 0), getal(s.besteDag), lijst(s.album).length],
      'rommelland-v1': s => [getal(s.nieuw), getal(s.dag), aantal(s.doelen), getal(s.totaalGasten)],
      'reclame-v1': s => { const d = isObj(s.dag) ? s.dag : {}; let n = 0; for (const v of Object.values(isObj(s.s) ? s.s : {})) for (const x of String(v)) n += Math.min(3, +x || 0); return [n, getal(d.n), getal(d.b)]; },
      'rommelgroepjes-v1': s => { let o = 0, z = 0, g = 0; for (const v of Object.values(isObj(s.p) ? s.p : {})) { const x = String(v); g++; if (x[0] === 'w' || x[0] === 'a') { o++; if (x[1] === '0') z++; } } return [o, z, g]; },
      'rommelcasino-v1': s => [getal(s.n), aantal(s.u), aantal(s.dag)],
      'rommelwoord-extra-v1': s => Object.values(isObj(s.d) ? s.d : {}).map(woordMaat).reduce((a, m) => [a[0] + m[0], a[1] + m[1]], [0, 0]),
      'cryptisch-v1': s => woordMaat(s.d),
      'letterval-v1': s => woordMaat(s.d),
      'klinkermijnen-v1': s => woordMaat(s.d),
      'rommelhoekje-speler': s => [s && s.naam ? 1 : 0],
    };
    const maatVan = (sleutel, s) => { try { return MAAT[sleutel] && isObj(s) ? MAAT[sleutel](s).map(x => getal(x)) : []; } catch (e) { return []; } };
    const vergelijk = (a, b) => { for (let k = 0; k < Math.max(a.length, b.length); k++) { const x = getal(a[k]), y = getal(b[k]); if (x !== y) return x > y ? 1 : -1; } return 0; };
    // ---------- de regels per spel. geheel: één hele versie wint (met de maat); keuze: de velden die toch per instelling meegaan.
    // velden: per veld een regel (wat er niet staat, is keuze); na: nog iets rechtzetten (geeft het null, dan wordt het toch geheel).
    const SPEL = {
      'vlaaienbakker-v1': { geheel: true, keuze: ['getal'] },
      'vlaaienbakker-week-v1': { geheel: true },
      'rommelbeesten-v1': { geheel: true, keuze: ['geluid'] },
      'rommelhotel-v1': { geheel: true, keuze: ['look', 'geluid', 'zoom'] },
      'rommelland-v1': { geheel: true },
      'rubendeduiker-v1': { geheel: true, keuze: ['inst'] },
      'rommelpoker-spel-v2': { geheel: true },
      'rommelblok-v2': { geheel: true },
      'rommelpoker-record': { velden: { verst: max, beste: max, win: elk(max), gezien: elk(bitjes), inst: keuze, voortgangTotaal: max,
        tel: { h: elk(teller), standGewonnen: max, maxSteen: max, maxIjzer: max, verst: max, beste: max, '*': teller } } },
      'rommelkroon-v1': {
        velden: {
          // per puzzel de beste keer, zoals de scoreserver het al deed; per dag liefst de keer op de dag zelf
          opgelost: elk(kroonBest), dag: elk(kroonDag),
          // (2026-11-03) de kroon van de week net als dag; Eindeloos (per maat en moeilijkheid) en Zen tellen op; Tegen de klok: het record en hoe vaak
          week: elk(kroonDag), eind: elk(teller), eindTijd: elk(snelste), klok: { b: max, n: teller }, zen: teller,
          // (voor later) per trucje de opgeloste oefeningen, je eigen puzzels (hooguit 30), gedeelde puzzels die je speelde (de beste keer),
          // en je vrienden: { code: tijdstip }, een negatief tijdstip is weggehaald; de nieuwste verandering wint, dus weghalen gaat ook mee
          school: elk(samenLijst), gemaakt: samenLijst, vreemd: elk(kroonBest), vrienden: elk((b, s, i) => (!num(s) ? i : !num(i) ? s : Math.abs(i) >= Math.abs(s) ? i : s)),
          bezig: elk(lopend), auto: keuze, inst: keuze, laatste: keuze, uitleg: of, voortgangTotaal: max,
        },
        na: r => {
          if (isObj(r.bezig)) for (const k of Object.keys(r.bezig)) if ((isObj(r.opgelost) && r.opgelost[k]) || (k[0] === 'd' && isObj(r.dag) && r.dag[k.slice(1)]) || (k[0] === 'w' && isObj(r.week) && r.week[k.slice(1)])) delete r.bezig[k];
          if (Array.isArray(r.gemaakt)) r.gemaakt = r.gemaakt.slice(-30);
          return r;
        },
      },
      'rommelrecht-v1': { velden: { v: max, gehaald: elk(of), manieren: elk(samenLijst), dag: elk(samenLijst), voortgangTotaal: max } },
      'rommelgroepjes-v1': { velden: { v: max, uitleg: of, laatst: max, voortgangTotaal: max,
        // per dag: de eerste definitieve uitslag telt (w, a, v of x); is er nog geen, dan de langste poging
        p: elk((b, s, i) => { if (typeof s !== 'string' || typeof i !== 'string') return s === undefined ? i : s; const ks = /^[wavx]/.test(s), ki = /^[wavx]/.test(i); return ks ? s : ki ? i : i.length >= s.length ? i : s; }) } },
      'rommelwoord-dag-v1': { velden: {}, na: (r, b, s, i) => {
        // zelfde dag: wie het eerst klaar was, anders de langste poging; een nieuwere dag wint van een oudere
        if (getal(s.dag) !== getal(i.dag)) return getal(i.dag) > getal(s.dag) ? i : s;
        if (s.klaar) return s; if (i.klaar) return i;
        return lijst(i.pogingen).length >= lijst(s.pogingen).length ? i : s;
      } },
      'rommelwoord-stats-v1': { velden: { gespeeld: teller, gewonnen: teller, verdeling: (b, s, i, c) => (Array.isArray(s) && Array.isArray(i) ? Array.from({ length: Math.max(s.length, i.length) }, (x, k) => teller(lijst(b)[k], getal(s[k]), getal(i[k]), c)) : keuze(b, s, i, c)), besteReeks: max, laatsteWinst: max },
        na: (r, b, s, i) => { r.reeks = getal(i.laatsteWinst, -9) > getal(s.laatsteWinst, -9) ? i.reeks : getal(s.laatsteWinst, -9) > getal(i.laatsteWinst, -9) ? s.reeks : Math.max(getal(s.reeks), getal(i.reeks)); if (num(r.besteReeks) && num(r.reeks)) r.besteReeks = Math.max(r.besteReeks, r.reeks); return r; } },
      'opgevoel-v1': {
        velden: { v: max, records: elk({ best: max, n: teller, som: teller }), dagen: elk(eerste), bezig: lopend, inst: keuze,
          stat: { dag: { n: teller, som: teller, best: max }, vrij: { n: teller, som: teller, best: max } }, reeks: (b, s, i) => s },
        na: (r, b, s, i) => {
          if (isObj(r.dagen)) { const d = Object.keys(r.dagen).sort(); for (const k of d.slice(0, Math.max(0, d.length - 120))) delete r.dagen[k]; }
          const rs = isObj(s.reeks) ? s.reeks : {}, ri = isObj(i.reeks) ? i.reeks : {}, nieuw = String(ri.laatste || '') > String(rs.laatste || '') ? ri : String(rs.laatste || '') > String(ri.laatste || '') ? rs : getal(ri.lengte) >= getal(rs.lengte) ? ri : rs;
          if (isObj(s.reeks) || isObj(i.reeks)) r.reeks = Object.assign({}, nieuw, { beste: Math.max(getal(rs.beste), getal(ri.beste), getal(nieuw.lengte)) });
          if (isObj(r.bezig) && isObj(r.dagen) && r.dagen[r.bezig.dag]) r.bezig = null;
          return r;
        },
      },
      'reclame-v1': {
        velden: { v: max, s: elk(cijfers), look: elk(keuze), voortgangTotaal: max, dag: (b, s, i) => s },
        na: (r, b, s, i, c) => {
          const x = isObj(s.dag) ? s.dag : null, y = isObj(i.dag) ? i.dag : null, z = isObj(b && b.dag) ? b.dag : {};
          if (!x || !y) { r.dag = x || y || r.dag; return r; }
          const nieuwer = getal(y.d) > getal(x.d), gelijk = getal(y.d) === getal(x.d);
          r.dag = Object.assign({}, x, { d: Math.max(getal(x.d), getal(y.d)), s: nieuwer ? getal(y.s) : gelijk ? Math.max(getal(x.s), getal(y.s)) : getal(x.s), r: nieuwer ? getal(y.r) : gelijk ? Math.max(getal(x.r), getal(y.r)) : getal(x.r),
            n: dagTeller(z.n, getal(x.n), getal(y.n), c, gelijk && getal(x.d) > getal(z.d)), b: Math.max(getal(x.b), getal(y.b), getal(x.r), getal(y.r)) });
          return r;
        },
      },
      'huisopstelten-v1': {
        velden: { v: max, k: elk((b, s, i) => (isObj(s) && isObj(i) ? Object.assign({}, s, { s: [0, 1, 2].map(k => (lijst(s.s)[k] || lijst(i.s)[k] ? 1 : 0)), t: snelste(undefined, s.t, i.t), c: max(undefined, s.c, i.c) }) : isObj(s) ? s : i)),
          album: samenLijst, besteDag: max, inst: keuze, voortgangTotaal: max, dag: (b, s, i) => s, dagen: (b, s, i) => s },
        na: (r, b, s, i, c) => {
          const x = isObj(s.dag) ? s.dag : null, y = isObj(i.dag) ? i.dag : null, z = isObj(b && b.dag) ? b.dag : {};
          r.dag = x && y ? (getal(y.n) > getal(x.n) ? y : x) : x || y || null;
          if (num(s.dagen) || num(i.dagen)) r.dagen = dagTeller(b && b.dagen, getal(s.dagen), getal(i.dagen), c, !!(x && y) && getal(x.n) === getal(y.n) && getal(x.n) > getal(z.n));
          return r;
        },
      },
      'rommelsteek-v1': { velden: { werk: elk(steekjes), af: elk(max), voortgangTotaal: max } },
      'rommelwheels-v1': {
        velden: { v: max, opbouw: max, gespeeld: teller, voortgangTotaal: max,
          levels: elk({ gehaald: of, alle: of, heel: of, besteTijd: snelste, oudeTijd: snelste, punten: max, maxSterren: max }),
          // zelfgemaakte levels, per level apart: nieuw op één apparaat blijft, weggehaald op één (en niet veranderd op het andere) is weg
          eigen: (b, s, i, c) => {
            if (!Array.isArray(s) || !Array.isArray(i)) return keuze(b, s, i, c);
            const id = l => (isObj(l) ? String(l.id) : ''), B = new Map(lijst(b).map(l => [id(l), l])), S = new Map(s.map(l => [id(l), l])), I = new Map(i.map(l => [id(l), l])), r = [];
            for (const k of new Set([...S.keys(), ...I.keys()])) {
              const x = S.get(k), y = I.get(k), z = B.get(k);
              if (x && y) r.push(c.basis ? keuze(z, x, y, c) : y);
              else if (x) { if (!(c.basis && z && zelfde(x, z))) r.push(x); }
              else if (!(c.basis && z && zelfde(y, z))) r.push(y);
            }
            return r.slice(0, 30);
          } } },
      'rommelarend-v1': { velden: { ontdekt: samenLijst, veren: samenLijst, gestart: of, voortgangTotaal: max,
        races: elk((b, s, i) => (isObj(s) && isObj(i) ? Object.assign({}, s, { tijd: snelste(undefined, s.tijd, i.tijd), medaille: (MEDAILLE[i.medaille] || 0) > (MEDAILLE[s.medaille] || 0) ? i.medaille : s.medaille }) : isObj(s) ? s : i)) } },
      'rommelbel-v1': { velden: { open: max, sterren: elk(max), scores: elk(max), eindeloos: max, gespeeld: teller, voortgangTotaal: max } },
      'rommelritme-v1': { velden: { best: elk(max), pogingen: elk(teller), gehaald: elk(of), voortgangTotaal: max } },
      'vouwvlieger-v1': { velden: { best: max, sterren: teller, gespeeld: teller, spaar: saldo, skins: samenLijst, upg: samenLijst },
        // sterren uitgeven op twee apparaten tegelijk: kocht je op allebei hetzelfde, dan krijg je één keer je sterren terug.
        // Gaf je samen meer uit dan je had, dan voegen we niet samen (anders kreeg je iets gratis): dan wint de meeste voortgang.
        na: (r, b, s, i, c) => {
          if (!c.basis || !isObj(b) || !num(r.spaar)) return null;
          const oud = new Set([...lijst(b.skins), ...lijst(b.upg)]), beide = [...lijst(s.skins), ...lijst(s.upg)].filter(x => !oud.has(x) && [...lijst(i.skins), ...lijst(i.upg)].includes(x));
          r.spaar = getal(r.spaar) + beide.reduce((a, x) => a + getal(VV_PRIJS[x]), 0);
          return r.spaar >= 0 ? r : null;
        } },
      'rommelrob-v1': { velden: { best: max, bestSpam: max, totaal: teller, gespeeld: teller } },
      'productiefiets-v1': { velden: { best: max, bestMeter: max, gespeeld: teller, koffie: teller } },
      'steiger-v1': { velden: { sterren: elk(max), scores: elk(max) } },
      'mengelmoes-v1': { velden: { v: max, stats: { pogingen: teller, mislukt: teller, gestart: snelste }, el: (b, s, i) => s, werk: (b, s, i) => s },
        // je stickers op naam samen; de verwijzingen (recepten en het werkvlak) wijzen daarna naar de goede plek in de nieuwe lijst
        na: (r, b, s, i, c) => {
          const el = lijst(s.el).map(x => (Array.isArray(x) ? x.slice() : x)), plek = new Map(), naar = [];
          el.forEach((x, k) => { if (Array.isArray(x)) plek.set(mmNaam(x[0]), k); });
          lijst(i.el).forEach((x, k) => {
            if (!Array.isArray(x)) { naar[k] = -1; return; }
            const n = mmNaam(x[0]);
            if (plek.has(n)) { const j = plek.get(n); naar[k] = j; if (x[4] && Array.isArray(el[j])) el[j][4] = 1; return; }
            const y = x.slice(); y[2] = getal(y[2], -1) >= 0 ? getal(naar[y[2]], -1) : -1; y[3] = getal(y[3], -1) >= 0 ? getal(naar[y[3]], -1) : -1;
            naar[k] = el.length; plek.set(n, el.length); el.push(y);
          });
          r.el = el;
          // het werkvlak is iets dat bezig is: de laatste versie, met de verwijzingen goed gezet
          const w = lopend(b && b.werk, s.werk, i.werk, c);
          r.werk = w === i.werk && w !== s.werk ? lijst(w).map(x => (Array.isArray(x) && naar[x[0]] >= 0 ? [naar[x[0]], x[1], x[2]] : null)).filter(Boolean) : w;
          return r;
        } },
      'rommelblok-v3': { velden: { v: max, inst: elk(keuze),
        // je gedeelde werelden, per wereld; de sleutel van de eigenaar blijft bewaard
        samen: (b, s, i, c) => {
          if (!Array.isArray(s) || !Array.isArray(i)) return keuze(b, s, i, c);
          const r = s.filter(isObj).map(x => Object.assign({}, x)), m = new Map(r.map(x => [x.i, x]));
          for (const y of i.filter(isObj)) { const x = m.get(y.i); if (!x) { const z = Object.assign({}, y); r.push(z); m.set(y.i, z); } else if (!x.k && y.k) x.k = y.k; }
          return r.slice(0, 10);
        } } },
      // Casino Rommelroyaal: de fiches (en wat erbij hoort: de kassa, het aantal rondes en een ronde die nog loopt) komen in zijn geheel van de
      // versie met de meeste voortgang, nooit samengevoegd. Uitdagingen en de verzameling worden verdiend (niets is te koop): samen. De hand van
      // de dag: de eerste uitslag telt. geld: net als de spellen die geheel zijn, vraagt een tweede apparaat waar je verder wilt spelen.
      'rommelcasino-v1': { geld: true,
        velden: { v: max, u: elk(of), kast: samenLijst, dag: elk(eerste), dagb: lopend, kies: elk(keuze), inst: keuze, st: elk(tellers), bijna: elk(tellers), tel: elk(max), voortgangTotaal: max },
        na: (r, b, s, i) => { const w = vergelijk(maatVan('rommelcasino-v1', i), maatVan('rommelcasino-v1', s)) >= 0 ? i : s; for (const k of ['f', 'wg', 'kassa', 'n', 'bezig']) { if (k in w) r[k] = w[k]; else delete r[k]; } return r; } },
      // de woordspellen (2026-11-06): per dag de eerste uitslag, de tijd per dag de eerste, een spel dat nog loopt de laatste versie
      'rommelwoord-extra-v1': { velden: { v: max, d: elk(woordDagen), bezig: elk(lopend), inst: keuze },
        na: r => { if (isObj(r.bezig) && isObj(r.d)) for (const k of Object.keys(r.bezig)) if (isObj(r.bezig[k]) && (String(r.d[k] || '')[getal(r.bezig[k].dag, -1)] || '.') !== '.') delete r.bezig[k]; return r; } },
      'cryptisch-v1': { velden: { v: max, d: woordDagen, t: elk(eerste), bezig: lopend, inst: keuze }, na: woordNa },
      'letterval-v1': { velden: { v: max, d: woordDagen, h: hintDagen, t: elk(eerste), bezig: lopend, inst: keuze }, na: woordNa },
      'klinkermijnen-v1': { velden: { v: max, d: woordDagen, t: elk(eerste), bezig: lopend, inst: keuze }, na: woordNa },
      'rommelhoekje-eitjes': { velden: elk(samenLijst) },
      'rommelhoekje-speler': { heel: true },
      'gereedschap-v2': { heel: true },
      'rommelhoekje-thema': { tekst: true },
      'rommelblok-taal': { tekst: true },
    };
    const leesJ = t => { if (typeof t !== 'string') return undefined; try { return JSON.parse(t); } catch (e) { return undefined; } };
    // Twee versies samenvoegen. bT, sT en iT zijn de opslag als tekst (bT mag null zijn: geen basis bekend).
    // Geeft { data, wie }: wie is 'in' (de binnenkomende versie blijft), 'server' (wat de server had blijft) of 'samen' (iets nieuws).
    function voeg(sleutel, bT, sT, iT) {
      if (sT === iT || typeof sT !== 'string') return { data: iT, wie: 'in' };
      if (typeof iT !== 'string') return { data: sT, wie: 'server' };
      const spec = SPEL[sleutel] || { geheel: true }, c = { basis: typeof bT === 'string' };
      const uit = r => { const t = typeof r === 'string' ? r : JSON.stringify(r); if (t === iT || zelfde(r, leesJ(iT))) return { data: iT, wie: 'in' }; if (t === sT || zelfde(r, leesJ(sT))) return { data: sT, wie: 'server' }; return { data: t, wie: 'samen' }; };
      if (spec.tekst) return uit(keuze(bT === null ? undefined : bT, sT, iT, c));
      const b = leesJ(bT), s = leesJ(sT), i = leesJ(iT);
      if (spec.heel) return s === undefined || i === undefined ? { data: iT, wie: 'in' } : uit(keuze(b, s, i, c));
      // kapotte opslag: dan wint de leesbare, en anders wat het laatst binnenkwam
      if (!isObj(s) || !isObj(i)) return isObj(s) ? { data: sT, wie: 'server' } : { data: iT, wie: 'in' };
      const geheel = () => {
        const w = vergelijk(maatVan(sleutel, i), maatVan(sleutel, s)) >= 0 ? i : s;
        if (!spec.keuze) return uit(w);
        const r = Object.assign({}, w); for (const k of spec.keuze) { const v = keuze(isObj(b) ? b[k] : undefined, s[k], i[k], c); if (v === undefined) delete r[k]; else r[k] = v; }
        return uit(r);
      };
      if (spec.geheel) return geheel();
      let r; try { r = velden(spec.velden || {}, b, s, i, c); if (spec.na) r = spec.na(r, isObj(b) ? b : null, s, i, c); } catch (e) { r = null; }
      return r === null || r === undefined ? geheel() : uit(r);
    }
    const soort = sleutel => { const s = SPEL[sleutel]; return !s || s.geheel ? 'geheel' : s.tekst || s.heel ? 'keuze' : 'samen'; };
    return { voeg, soort, maat: (sleutel, t) => maatVan(sleutel, typeof t === 'string' ? leesJ(t) : t), vergelijk, MAAT, SPEL };
  })();
  // ==== REGELS eind
  // ================================================================ KOPPELEN: dezelfde voortgang op al je apparaten
  // Een koppelcode (een paar woorden en een getal) verbindt je apparaten. De server bewaart je voortgang alleen bij een versleutelde vorm van die code.
  // De volgorde bepaalt de server (zijn eigen klok), niet de klok van een apparaat. Per spel onthoudt dit apparaat in staat[sleutel] de laatste
  // versie waarover het het met de server eens was: h (de vingerafdruk, hash) en t (het versienummer van de server). Wat hier daarna verandert,
  // gaat mee met die vingerafdruk (basisH). Heeft een ander apparaat de server intussen veranderd, dan is het een botsing, en beslist de server:
  // per spel de meeste voortgang, en waar het eerlijk kan samengevoegd. De andere versie bewaart de server (Ruben kan hem terugzetten).
  const KKEY = 'rommelhoekje-koppel';
  // hulp van Ruben (terugzetten, herstellen of een cadeautje): wat dit apparaat al kreeg, en wat het nog aan de server moet melden
  const HKEY = 'rommelhoekje-hulp';
  const leesH = () => { try { const h = JSON.parse(localStorage.getItem(HKEY) || 'null'); if (h && Array.isArray(h.gehad)) return { gehad: h.gehad, ontvangen: h.ontvangen || [], gezien: h.gezien || [] }; } catch (e) {} return { gehad: [], ontvangen: [], gezien: [] }; };
  const schrijfH = H => { try { H.gehad = H.gehad.slice(-60); localStorage.setItem(HKEY, JSON.stringify(H)); } catch (e) {} };
  // een cadeautje of een kleine verandering: een getal erbij, of een waarde zetten (bijvoorbeeld je naam)
  function wijzig(oud, ops) {
    let s = null; try { s = JSON.parse(oud || 'null'); } catch (e) {} if (!s || typeof s !== 'object') s = {};
    for (const o of ops) {
      const delen = String(o.pad || '').split('.'); if (!delen[0] || delen.some(d => d === '__proto__' || d === 'constructor' || d === 'prototype')) continue;
      let p = s; for (const d of delen.slice(0, -1)) { if (!p[d] || typeof p[d] !== 'object') p[d] = {}; p = p[d]; }
      const laatst = delen[delen.length - 1];
      if ('erbij' in o) p[laatst] = (typeof p[laatst] === 'number' && isFinite(p[laatst]) ? p[laatst] : 0) + Number(o.erbij || 0); else p[laatst] = o.zet;
    }
    return JSON.stringify(s);
  }
  // ---------- betrouwbaarheid: verzoeken met een tijdslimiet, zodat een trage server niets laat hangen
  const metTijd = (u, opties, ms) => { const c = new AbortController(), t = setTimeout(() => c.abort(), ms || 12000); return fetch(u, Object.assign({}, opties || {}, { signal: c.signal })).finally(() => clearTimeout(t)); };
  const SLEUTELS = ['vlaaienbakker-v1', 'rommelwoord-stats-v1', 'rommelwoord-dag-v1', 'rommelpoker-record', 'rommelpoker-spel-v2', 'rommelbeesten-v1', 'rommelhotel-v1', 'rommelland-v1', 'rommelblok-v2', 'rommelblok-v3', 'rommelblok-taal', 'vouwvlieger-v1', 'rommelritme-v1', 'rommelkroon-v1', 'rommelarend-v1', 'rommelrob-v1', 'rommelbel-v1', 'rommelsteek-v1', 'productiefiets-v1', 'steiger-v1', 'rommelwheels-v1', 'mengelmoes-v1', 'opgevoel-v1', 'rommelrecht-v1', 'rubendeduiker-v1', 'huisopstelten-v1', 'reclame-v1', 'rommelgroepjes-v1', 'rommelcasino-v1', 'rommelwoord-extra-v1', 'cryptisch-v1', 'letterval-v1', 'klinkermijnen-v1', 'rommelhoekje-thema', 'vlaaienbakker-week-v1', 'rommelhoekje-speler', 'rommelhoekje-eitjes', 'gereedschap-v2'];
  const MAX = 380000;
  const leesK = () => { try { return JSON.parse(localStorage.getItem(KKEY) || 'null'); } catch (e) { return null; } };
  const schrijfK = K => { try { if (K) localStorage.setItem(KKEY, JSON.stringify(K)); else localStorage.removeItem(KKEY); } catch (e) {} };
  const hash = t => { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36) + ':' + t.length; };
  const pagina = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  const EIGEN = { rob: 'rommelrob', steigerstress: 'steiger' };   // pagina's die anders heten dan hun opslag
  const vanDezePagina = k => pagina && pagina !== 'index' && k.startsWith(EIGEN[pagina] || pagina);
  let bezigK = false, eersteK = true;
  const APPARAAT = (() => { try { let a = localStorage.getItem('rommel-apparaat'); if (!a) { a = Array.from(crypto.getRandomValues(new Uint8Array(12)), x => x.toString(16).padStart(2, '0')).join(''); localStorage.setItem('rommel-apparaat', a); } return a; } catch (e) { return ''; } })();
  // het oude koppelen (v2): voor een scoreserver die het nieuwe nog niet kent
  async function koppelSync2(stil, opties, K0, url) {
    {
      // de eerste keer met deze versie van de site (overgang): alles meesturen, zodat de server per spel kan kijken of het klopt
      const staat0 = K0.staat || {}, overgang = K0.v !== 2, dag = new Date().toDateString(), groot = Object.assign({}, K0.groot || {});
      const items = {}, bekend = {}, bekendH = {}, verstuurd = {}, teGroot = {};
      for (const k of SLEUTELS) {
        let v = null; try { v = localStorage.getItem(k); } catch (e) {}
        const st = staat0[k];
        if (st) { bekend[k] = st.t || 0; if (st.h) bekendH[k] = st.h; }
        if (v === null || (st && st.h === hash(v) && !overgang)) continue;
        // te groot om te versturen: blijft op dit apparaat, en Ruben ziet het (hooguit één keer per dag per spel)
        if (v.length > MAX) { if (groot[k] !== dag) { teGroot[k] = v.length; groot[k] = dag; } continue; }
        items[k] = { t: Date.now(), data: v, basis: st ? st.t || 0 : 0, basisH: st && st.h ? st.h : '' };
        if (K0.hulpUit && K0.hulpUit[k]) items[k].hulp = K0.hulpUit[k];
        verstuurd[k] = v;
      }
      const H0 = leesH();
      const r = await metTijd(url + '/sync', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ v: 2, code: K0.code, items, bekend, bekendH, apparaat: APPARAAT, hulpKan: 1, ontvangen: H0.ontvangen, gezien: H0.gezien, teGroot, koppelen: opties.koppelen ? 1 : 0 }) });
      const j = await r.json(); if (!j.ok) return null;
      // opnieuw lezen: een ander tabblad kan intussen ook iets hebben bijgewerkt
      const K = leesK(); if (!K || K.code !== K0.code) return null;
      K.staat = K.staat || {}; K.groot = groot;
      const H = leesH(); H.ontvangen = H.ontvangen.filter(n => !H0.ontvangen.includes(n)); H.gezien = H.gezien.filter(n => !H0.gezien.includes(n));
      const lees = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
      const naamOpnieuw = () => { try { speler = JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch (e) {} document.dispatchEvent(new CustomEvent('scorebord-naam')); };
      // wat de server van dit apparaat aannam: dat is nu de gezamenlijke versie
      for (const [k, t] of Object.entries(j.gezet || {})) if (k in verstuurd && !(j.vervangen && j.vervangen[k])) { K.staat[k] = { h: hash(verstuurd[k]), t }; if (K.hulpUit && items[k].hulp) delete K.hulpUit[k]; }
      if (K.hulpUit && !Object.keys(K.hulpUit).length) delete K.hulpUit;
      for (const [k, t] of Object.entries(j.gelijk || {})) if (K.staat[k] && K.staat[k].h === bekendH[k]) K.staat[k].t = t;
      const herstel = {}, herstelStaat = {}; let nieuwHier = false, geweigerdHier = '', vervangenHier = false, samenHier = false, hulpHier = false;
      for (const [k, it] of Object.entries(j.items || {})) {
        if (!SLEUTELS.includes(k) || !it || typeof it.data !== 'string') continue;
        const hier = lees(k), st = K.staat[k], weg = j.geweigerd && j.geweigerd[k], verv = j.vervangen && j.vervangen[k];
        if (hier === it.data) { K.staat[k] = { h: hash(it.data), t: it.t }; continue; }
        // Mag de versie van de server hier neergezet worden? Alleen als hier intussen niet verder gespeeld is.
        // Anders lost de server het de volgende keer op (een botsing: de meeste voortgang wint, de andere versie blijft bewaard).
        let mag;
        if (k in verstuurd) mag = !!(weg || verv) && hier === verstuurd[k];
        else if (hier === null) mag = !st || it.t > (st.t || 0);
        else mag = !!st && st.h === hash(hier);
        if (!mag) continue;
        const nieuw = { h: hash(it.data), t: it.t };
        if (vanDezePagina(k)) { herstel[k] = it.data; herstelStaat[k] = nieuw; nieuwHier = true; if (weg) geweigerdHier = weg; else if (verv === 'samen') samenHier = true; else if (verv) vervangenHier = true; }
        else { try { localStorage.setItem(k, it.data); } catch (e) {} K.staat[k] = nieuw; if (k === SKEY) naamOpnieuw(); }
      }
      // hulp van Ruben: neerzetten, en altijd laten zien wat hij deed (zie toonHulp); er verandert nooit iets zonder bericht
      const berichten = [];
      for (const h of Array.isArray(j.hulp) ? j.hulp : []) {
        if (!h || !h.nr || !/^[a-z0-9-]{3,40}$/.test(h.sleutel || '') || !['zet', 'wijzig', 'wis'].includes(h.soort)) continue;
        if (H.gehad.includes(h.nr)) { if (!H.ontvangen.includes(h.nr)) H.ontvangen.push(h.nr); continue; }
        let nieuw = null, ops = null; const oud = h.sleutel in herstel ? herstel[h.sleutel] : lees(h.sleutel);
        try { if (h.soort === 'zet') nieuw = String(h.data); else if (h.soort === 'wijzig') { ops = JSON.parse(h.data); nieuw = wijzig(oud, ops); } } catch (e) { continue; }
        if (vanDezePagina(h.sleutel)) { herstel[h.sleutel] = nieuw; delete herstelStaat[h.sleutel]; nieuwHier = true; hulpHier = true; }
        else { try { if (nieuw === null) localStorage.removeItem(h.sleutel); else localStorage.setItem(h.sleutel, nieuw); } catch (e) {} }
        if (h.sleutel === SKEY) naamOpnieuw();
        if (nieuw === null) delete K.staat[h.sleutel]; else { K.staat[h.sleutel] = { h: 'hulp:' + h.nr, t: 0 }; (K.hulpUit = K.hulpUit || {})[h.sleutel] = h.nr; }
        H.gehad.push(h.nr); H.ontvangen.push(h.nr);
        berichten.push({ nr: h.nr, cadeau: !!(ops && ops.length && ops.every(o => 'erbij' in o && o.erbij > 0)), titel: String(h.titel || '').slice(0, 60), bericht: String(h.bericht || '').slice(0, 300) });
      }
      schrijfH(H);
      K.laatst = Date.now(); if (overgang) K.v = 2; schrijfK(K);
      if (berichten.length && !hulpHier) { toonHulp(berichten); setTimeout(() => koppelSync(true), 1500); }
      // nieuwe voortgang voor het spel dat nu open is: neerzetten bij het herladen (bovenaan dit blok, vóór het spel zijn opslag leest)
      if (nieuwHier) {
        const bewaar = soort => { try { sessionStorage.setItem('koppel-herstel', JSON.stringify(herstel)); sessionStorage.setItem('koppel-herstel-v', JSON.stringify({ code: K.code, staat: herstelStaat })); if (soort) sessionStorage.setItem(soort[0], soort[1]); } catch (e) {} location.reload(); };
        if (hulpHier) { bewaar(['koppel-hulp', JSON.stringify(berichten)]); return j; }
        if (geweigerdHier) { bewaar(['koppel-geweigerd', geweigerdHier]); return j; }
        // een botsing waarbij het andere apparaat verder was: meteen die voortgang ophalen, anders speel je door op een versie die het niet wordt
        if (vervangenHier) { bewaar(['koppel-vervangen', '1']); return j; }
        if ((eersteK && !stil) || opties.herlaad) { bewaar(samenHier ? ['koppel-samen', '1'] : null); return j; }
        // later tijdens het spelen alleen een knop (anders gaan twee apparaten om de beurt herladen); de knop haalt eerst het nieuwste op
        const haal = async () => { const x = await koppelSync(true, { herlaad: true }); if (!x && bezigK) setTimeout(haal, 1500); };
        toonKoppelMelding(samenHier ? 'Wat je op je andere apparaat deed, is erbij gezet.' : 'Op een ander apparaat is verder gespeeld.', 'Haal die voortgang op', haal);
      }
      return j;
    }
  }
  // ================================================================ KOPPELEN 2.0 (v3): alleen wat er veranderde, ingepakt, met generaties
  // Kent de server het nieuwe koppelen (/status zegt koppel: 3), dan gaat het zo; anders zoals hierboven (v2).
  // Per spel bewaart dit apparaat in IndexedDB (rommelhoekje, basis) de laatste versie waarover het het met de server eens was. Daarvan
  // gaat alleen het verschil mee. Bij een botsing vraagt de server om de hele opslag en die basis, en voegen de REGELS samen.
  // Opnieuw beginnen (Scorebord.opnieuw) of een opslag weghalen is een nieuwe versie (een nieuwe generatie): een ander apparaat met de
  // oude stand kan die dan niet meer terugzetten. De spellen zelf lezen en schrijven gewoon localStorage, net als altijd.
  // BV: het versienummer van dit blok (verhoog het bij een nieuwe versie van het koppelen, net als BLOK_NU in de scoreserver)
  const GROOT = 300000, MAX3 = 5e6, KV = 'rommelhoekje-koppel-v', BV = 10;
  const IDB = (() => {
    let db = null;
    const open = () => db || (db = new Promise(ok => { try { const r = indexedDB.open('rommelhoekje', 1); r.onupgradeneeded = () => { for (const n of ['basis', 'uit']) if (!r.result.objectStoreNames.contains(n)) r.result.createObjectStore(n); }; r.onsuccess = () => ok(r.result); r.onerror = r.onblocked = () => ok(null); } catch (e) { ok(null); } }));
    const doe = async (modus, f, tabel) => { const d = await open(); if (!d) return null; return new Promise(ok => { try { const t = d.transaction(tabel || 'basis', modus), uit = f(t.objectStore(tabel || 'basis')); t.oncomplete = () => ok(uit ? uit.result : true); t.onerror = t.onabort = () => ok(null); } catch (e) { ok(null); } }); };
    return {
      async alle() { const d = await open(); const m = new Map(); if (!d) return m; await new Promise(ok => { try { const t = d.transaction('basis', 'readonly'), s = t.objectStore('basis'), k = s.getAllKeys(), v = s.getAll(); t.oncomplete = () => { k.result.forEach((x, i) => m.set(x, v.result[i])); ok(); }; t.onerror = t.onabort = () => ok(); } catch (e) { ok(); } }); return m; },
      zet: (k, v) => doe('readwrite', s => s.put(v, k)),
      weg: k => doe('readwrite', s => s.delete(k)),
      leeg: () => Promise.all([doe('readwrite', s => s.clear()), doe('readwrite', s => s.clear(), 'uit')]),
      // de wachtrij voor de service worker: wat zonder internet niet verstuurd kon worden (zie wachtrij)
      uitZet: (k, v) => doe('readwrite', s => s.put(v, k), 'uit'),
      uitWeg: k => doe('readwrite', s => s.delete(k), 'uit'),
    };
  })();
  let basisGeheugen = new Map(), basisGeladen = false;   // een kopie in het geheugen (één keer per pagina uit IndexedDB gelezen), ook voor het laatste verschil bij het sluiten
  const zetBasis = (k, v) => { basisGeheugen.set(k, v); return IDB.zet(k, v); };
  // inpakken en uitpakken (deflate-raw); kan de browser dat niet, dan gaat het gewoon onverpakt
  const kanInpakken = (() => { try { new CompressionStream('deflate-raw'); return true; } catch (e) { return false; } })();
  const inpak = async t => new Uint8Array(await new Response(new Blob([t]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer());
  const uitpak = async b => new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
  const naarB64 = u => { let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); };
  const vanB64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  // het verschil tussen twee teksten: [plek, hoeveel tekens eruit, wat erin]
  const verschil = (a, b) => { const m = Math.min(a.length, b.length); let p = 0; while (p < m && a.charCodeAt(p) === b.charCodeAt(p)) p++; let e = 0; while (e < m - p && a.charCodeAt(a.length - 1 - e) === b.charCodeAt(b.length - 1 - e)) e++; return [p, a.length - p - e, b.slice(p, b.length - e)]; };
  // kent de server het nieuwe koppelen? (een uur onthouden; gaat er iets mis, dan meteen opnieuw kijken)
  async function serverV3(inst) {
    try { const c = JSON.parse(localStorage.getItem(KV) || 'null'); if (c && Date.now() - c.t < 3600e3 && c.u === adres(inst) && 'qr' in c) return c.v === 3; } catch (e) {}
    let v = 2, tm = 0, qr = 0, pk = ''; try { const r = await metTijd(adres(inst) + '/status', { cache: 'no-store' }, 8000); const j = await r.json(); if (j && j.koppel >= 3) v = 3; if (j && j.tijdmachine) tm = 1; if (j && j.qr) qr = 1; if (j && typeof j.passkey === 'string') pk = j.passkey; } catch (e) { return false; }
    try { localStorage.setItem(KV, JSON.stringify({ v, tm, qr, pk, t: Date.now(), u: adres(inst) })); } catch (e) {}
    return v === 3;
  }
  const vergeetV3 = () => { try { localStorage.removeItem(KV); } catch (e) {} };
  // opnieuw beginnen in een spel: roep dit aan vlak vóór het spel zijn nieuwe, lege stand bewaart (of zijn opslag weghaalt).
  // We onthouden hoe de opslag er op dat moment uitzag: schrijft het spel daarna niets nieuws (bijvoorbeeld in een test), dan telt het niet.
  const nuH = k => { try { const v = localStorage.getItem(k); return v === null ? '' : hash(v); } catch (e) { return ''; } };
  function opnieuw(sleutel) { const K = leesK(); if (!K || !K.code || !SLEUTELS.includes(sleutel)) return; (K.opnieuw = K.opnieuw || {})[sleutel] = nuH(sleutel); schrijfK(K); }
  const isOpnieuw = (K, k, v) => !!(K.opnieuw && k in K.opnieuw && K.opnieuw[k] !== (v === null ? '' : hash(v)));
  // per spel: wat er naar de server gaat (of null als er niets veranderde)
  async function item3(k, v, st, b, K, groot, dag) {
    const nieuw = isOpnieuw(K, k, v);
    if (v === null) return st && st.h && st.h !== 'weg' && !String(st.h).startsWith('hulp:') ? { t: st.t || 0, h: st.h, weg: 1, nieuw: nieuw ? 1 : undefined } : null;
    const hv = hash(v);
    if (st && st.h === hv && !nieuw) return null;
    if (v.length > MAX3) { if (groot[k] !== dag) { groot[k] = dag; return { teGroot: v.length }; } return null; }
    const it = { t: st ? st.t || 0 : 0, h: st && st.h ? st.h : '', nh: hv };
    if (nieuw) it.nieuw = 1;
    if (K.hulpUit && K.hulpUit[k]) it.hulp = K.hulpUit[k];
    if (v.length > GROOT && kanInpakken) { const z = naarB64(await inpak(v)); if (z.length > 2.6e6) { if (groot[k] !== dag) { groot[k] = dag; return { teGroot: v.length }; } return null; } it.z = z; return it; }
    if (b && typeof b.data === 'string' && st && b.h === st.h && !nieuw) { const d = verschil(b.data, v); if (d[2].length < v.length * 0.7) { it.d = d; return it; } }
    it.data = v; return it;
  }
  async function koppelSync3(stil, opties, K0, url) {
    const staat0 = K0.staat || {}, dag = new Date().toDateString(), groot = Object.assign({}, K0.groot || {});
    if (!basisGeladen) { basisGeheugen = await IDB.alle(); basisGeladen = true; }
    const basis = basisGeheugen;
    const items = {}, kent = {}, kentH = {}, verstuurd = {}, teGroot = {};
    for (const k of SLEUTELS) {
      let v = null; try { v = localStorage.getItem(k); } catch (e) {}
      const st = staat0[k];
      if (st) { kent[k] = st.t || 0; if (st.h) kentH[k] = st.h; }
      const it = await item3(k, v, st, basis.get(k), K0, groot, dag);
      if (!it) continue;
      if (it.teGroot) { teGroot[k] = it.teGroot; continue; }
      items[k] = it; verstuurd[k] = v;
    }
    const H0 = leesH();
    const stuurOp = async lijf => {
      const tekst = JSON.stringify(lijf), z = kanInpakken && tekst.length > 600;
      const r = await metTijd(url + '/sync' + (z ? '?z=1' : ''), { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: z ? new Blob([await inpak(tekst)]) : tekst }, 20000);
      const j = await r.json().catch(() => null);
      // een oude scoreserver (die geen v: 3 terugzegt): opnieuw kijken welke versie hij is; even te druk of in onderhoud: gewoon later nog eens
      if (r.ok && j && j.ok && j.v !== 3) vergeetV3();
      return r.ok && j && j.ok && j.v === 3 ? j : null;
    };
    const lijf = { v: 3, code: K0.code, items, kent, kentH, apparaat: APPARAAT, hulpKan: 1, ontvangen: H0.ontvangen, gezien: H0.gezien, teGroot, koppelen: opties.koppelen ? 1 : 0, live: LIVE.kan ? 1 : 0, bel: LIVE.open(K0.code) ? 0 : 1, bv: BV };
    let j = await stuurOp(lijf); if (!j) return null;
    // de server wil van een paar spellen de hele opslag en de basis (een botsing, of een verschil dat niet meer klopte): meteen nog eens
    if (Array.isArray(j.stuur) && j.stuur.length) {
      const nog = {};
      for (const k of j.stuur) { if (!items[k]) continue; const v = verstuurd[k], b = basis.get(k), it = Object.assign({}, items[k]); delete it.d; if (typeof v === 'string' && !it.z) it.data = v; if (b && typeof b.data === 'string' && staat0[k] && b.h === staat0[k].h) it.basis = b.data; nog[k] = it; }
      const j2 = Object.keys(nog).length ? await stuurOp(Object.assign({}, lijf, { items: nog, ontvangen: [], gezien: [], teGroot: {} })) : null;
      if (j2) { for (const s of ['gezet', 'vervangen', 'geweigerd', 'gelijk']) j[s] = Object.assign({}, j[s] || {}, j2[s] || {}); j.items = Object.assign({}, j.items || {}, j2.items || {}); j.hulp = j2.hulp || j.hulp; }
      for (const k of j.stuur) if (!(j.gezet && j.gezet[k]) && !(j.vervangen && j.vervangen[k])) { delete verstuurd[k]; }
    }
    // opnieuw lezen: een ander tabblad kan intussen ook iets hebben bijgewerkt
    const K = leesK(); if (!K || K.code !== K0.code) return null;
    K.staat = K.staat || {}; K.groot = groot;
    const H = leesH(); H.ontvangen = H.ontvangen.filter(n => !H0.ontvangen.includes(n)); H.gezien = H.gezien.filter(n => !H0.gezien.includes(n));
    const lees = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const naamOpnieuw = () => { try { speler = JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch (e) {} document.dispatchEvent(new CustomEvent('scorebord-naam')); };
    const wacht = [];
    // wat de server van dit apparaat aannam: dat is nu de gezamenlijke versie
    for (const [k, g] of Object.entries(j.gezet || {})) if (k in verstuurd && !(j.vervangen && j.vervangen[k]) && g && g.h) {
      K.staat[k] = { t: g.t, h: g.h }; wacht.push(zetBasis(k, { t: g.t, h: g.h, data: verstuurd[k] }));
      if (K.opnieuw && items[k] && items[k].nieuw) delete K.opnieuw[k];
      if (K.hulpUit && items[k] && items[k].hulp) delete K.hulpUit[k];
    }
    if (K.hulpUit && !Object.keys(K.hulpUit).length) delete K.hulpUit;
    // een opnieuw-beginnen waarna het spel niets nieuws schreef, telt niet
    if (K.opnieuw) for (const k of Object.keys(K.opnieuw)) if (!(items[k] && items[k].nieuw) && K.opnieuw[k] === nuH(k)) delete K.opnieuw[k];
    if (K.opnieuw && !Object.keys(K.opnieuw).length) delete K.opnieuw;
    for (const [k, t] of Object.entries(j.gelijk || {})) if (K.staat[k] && K.staat[k].h === kentH[k]) K.staat[k].t = t;
    const elders = await openElders(), liveNu = [], geschreven = [];
    const herstel = {}, herstelStaat = {}; let nieuwHier = false, geweigerdHier = '', vervangenHier = false, samenHier = false, opnieuwHier = false, hulpHier = false;
    // voor wie het nieuwe antwoord leest (zoals Rommelland): items met de opslag als tekst
    const terug = Object.assign({}, j, { items: {} });
    for (const [k, it] of Object.entries(j.items || {})) {
      if (!SLEUTELS.includes(k) || !it) continue;
      let data; if (it.weg) data = null; else if (typeof it.z === 'string') { try { data = await uitpak(vanB64(it.z)); } catch (e) { continue; } } else if (typeof it.data === 'string') data = it.data; else continue;
      if (data !== null) terug.items[k] = { t: it.t, data };
      const hier = lees(k), st = K.staat[k], weg = j.geweigerd && j.geweigerd[k], verv = j.vervangen && j.vervangen[k], nieuw = { t: it.t, h: it.h || (data === null ? 'weg' : hash(data)) };
      if (hier === data) { K.staat[k] = nieuw; wacht.push(zetBasis(k, { t: it.t, h: nieuw.h, data })); continue; }
      // Mag de versie van de server hier neergezet worden? Alleen als hier intussen niet verder gespeeld is.
      let mag;
      if (k in verstuurd) mag = !!(weg || verv) && hier === verstuurd[k];
      else if (hier === null) mag = !st || st.h === 'weg' || it.t > (st.t || 0);
      else mag = !!st && st.h === hash(hier);
      if (!mag) continue;
      // staat dit spel in een ander tabblad open, dan zet dat tabblad het zelf neer (anders bewaart het spel daar straks zijn oude stand)
      if (!vanDezePagina(k) && elders(k)) continue;
      // een spel dat live kan bijwerken (Scorebord.live): meteen in het open spel, zonder te herladen (behalve als er om herladen
      // gevraagd is, zoals na terugzetten met de tijdmachine)
      if (vanDezePagina(k) && liveHaak[k] && !weg && verv !== 'opnieuw' && !opties.herlaad) {
        let ok = false; try { ok = liveHaak[k](leesJSON(data), data) !== false; } catch (e) { ok = false; }
        if (ok) { wacht.push(zetBasis(k, { t: it.t, h: nieuw.h, data })); try { if (data === null) localStorage.removeItem(k); else localStorage.setItem(k, data); } catch (e) {} K.staat[k] = nieuw; liveNu.push(verv === 'samen'); continue; }
      }
      wacht.push(zetBasis(k, { t: it.t, h: nieuw.h, data }));
      if (vanDezePagina(k)) { herstel[k] = data; herstelStaat[k] = nieuw; nieuwHier = true; if (weg) geweigerdHier = weg; else if (verv === 'samen') samenHier = true; else if (verv === 'opnieuw') opnieuwHier = true; else if (verv) vervangenHier = true; }
      else { try { if (data === null) localStorage.removeItem(k); else localStorage.setItem(k, data); } catch (e) {} K.staat[k] = nieuw; geschreven.push(k); if (k === SKEY) naamOpnieuw(); }
    }
    // hulp van Ruben: neerzetten, en altijd laten zien wat hij deed (zie toonHulp); er verandert nooit iets zonder bericht
    const berichten = [];
    for (const h of Array.isArray(j.hulp) ? j.hulp : []) {
      if (!h || !h.nr || !/^[a-z0-9-]{3,40}$/.test(h.sleutel || '') || !['zet', 'wijzig', 'wis'].includes(h.soort)) continue;
      if (H.gehad.includes(h.nr)) { if (!H.ontvangen.includes(h.nr)) H.ontvangen.push(h.nr); continue; }
      if (!vanDezePagina(h.sleutel) && elders(h.sleutel)) continue;   // dat tabblad zet het zelf neer
      let nieuw = null, ops = null; const oud = h.sleutel in herstel ? herstel[h.sleutel] : lees(h.sleutel);
      try { if (h.soort === 'zet') nieuw = String(h.data); else if (h.soort === 'wijzig') { ops = JSON.parse(h.data); nieuw = wijzig(oud, ops); } } catch (e) { continue; }
      if (vanDezePagina(h.sleutel)) { herstel[h.sleutel] = nieuw; delete herstelStaat[h.sleutel]; nieuwHier = true; hulpHier = true; }
      else { try { if (nieuw === null) localStorage.removeItem(h.sleutel); else localStorage.setItem(h.sleutel, nieuw); } catch (e) {} geschreven.push(h.sleutel); }
      if (h.sleutel === SKEY) naamOpnieuw();
      if (nieuw === null) delete K.staat[h.sleutel]; else { K.staat[h.sleutel] = { h: 'hulp:' + h.nr, t: 0 }; (K.hulpUit = K.hulpUit || {})[h.sleutel] = h.nr; }
      H.gehad.push(h.nr); H.ontvangen.push(h.nr);
      berichten.push({ nr: h.nr, cadeau: !!(ops && ops.length && ops.every(o => 'erbij' in o && o.erbij > 0)), titel: String(h.titel || '').slice(0, 60), bericht: String(h.bericht || '').slice(0, 300) });
    }
    schrijfH(H);
    K.laatst = Date.now(); K.v = 3; schrijfK(K);
    await Promise.all(wacht);
    if (berichten.length && !hulpHier) { toonHulp(berichten); setTimeout(() => koppelSync(true), 1500); }
    // voor de homepage (Puzzels van vandaag): er staat iets nieuws in de opslag
    if (geschreven.length) try { dispatchEvent(new CustomEvent('rommelhoekje-bijgewerkt', { detail: { sleutels: geschreven } })); } catch (e) {}
    if (liveNu.length && !nieuwHier) toonKoppelMelding(liveNu.some(x => x) ? 'Wat je op je andere apparaat deed, is erbij gezet.' : 'Bijgewerkt met je andere apparaat.');
    // nieuwe voortgang voor het spel dat nu open is: neerzetten bij het herladen (bovenaan dit blok, vóór het spel zijn opslag leest)
    if (nieuwHier) {
      const bewaar = soort => { try { sessionStorage.setItem('koppel-herstel', JSON.stringify(herstel)); sessionStorage.setItem('koppel-herstel-v', JSON.stringify({ code: K.code, staat: herstelStaat })); if (soort) sessionStorage.setItem(soort[0], soort[1]); } catch (e) {} location.reload(); };
      if (hulpHier) { bewaar(['koppel-hulp', JSON.stringify(berichten)]); return terug; }
      if (geweigerdHier) { bewaar(['koppel-geweigerd', geweigerdHier]); return terug; }
      if (opnieuwHier) { bewaar(['koppel-opnieuw', '1']); return terug; }
      if (vervangenHier) { bewaar(['koppel-vervangen', '1']); return terug; }
      if ((eersteK && !stil) || opties.herlaad) { bewaar(samenHier ? ['koppel-samen', '1'] : null); return terug; }
      const haal = async () => { const x = await koppelSync(true, { herlaad: true }); if (!x && bezigK) setTimeout(haal, 1500); };
      toonKoppelMelding(samenHier ? 'Wat je op je andere apparaat deed, is erbij gezet.' : 'Op een ander apparaat is verder gespeeld.', 'Haal die voortgang op', haal);
    }
    return terug;
  }
  // bij het sluiten van een pagina: als allerlaatste (na de opslag van het spel) nog snel versturen wat veranderd is (alleen het verschil)
  function sluitSync3(K, url) {
    const items = sluitItems(K, 60000); if (!items) return;
    try { fetch(url + '/sync', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ v: 3, code: K.code, items, kent: {}, apparaat: APPARAAT, alleenSturen: 1, live: 1, bv: BV }), keepalive: true }); } catch (e) {}
  }
  // zonder internet: wat er veranderde, in de wachtrij voor de service worker (die stuurt het zodra er weer verbinding is, ook als de
  // pagina dicht is; Chrome en Android). Zet deze pagina later zelf gelijk, dan haalt ze de wachtrij weer weg.
  function wachtrij(K, url) {
    const items = sluitItems(K, 1.5e6); if (!items) return;
    IDB.uitZet('sync', { url: url + '/sync', body: JSON.stringify({ v: 3, code: K.code, items, kent: {}, apparaat: APPARAAT, alleenSturen: 1, live: 1, bv: BV }), t: Date.now() })
      .then(() => { if (navigator.serviceWorker && navigator.serviceWorker.ready) return navigator.serviceWorker.ready.then(r => r.sync && r.sync.register('rommelhoekje-sync')); }).catch(() => {});
  }
  function sluitItems(K, max) {
    let hs = {}; try { hs = JSON.parse(sessionStorage.getItem('koppel-herstel') || '{}') || {}; } catch (e) {}
    const items = {}; let grootte = 0;
    for (const k of SLEUTELS) {
      if (k in hs) continue; let v = null; try { v = localStorage.getItem(k); } catch (e) {}
      const st = (K.staat || {})[k], nieuw = isOpnieuw(K, k, v); if (v === null || (st && st.h === hash(v) && !nieuw)) continue;
      const it = { t: st ? st.t || 0 : 0, h: st && st.h ? st.h : '', nh: hash(v) }, b = basisGeheugen.get(k);
      if (nieuw) it.nieuw = 1; if (K.hulpUit && K.hulpUit[k]) it.hulp = K.hulpUit[k];
      if (b && typeof b.data === 'string' && st && b.h === st.h && !it.nieuw) it.d = verschil(b.data, v); else it.data = v;
      const n = it.d ? it.d[2].length + 40 : v.length; if (grootte + n > max) continue; grootte += n; items[k] = it;
    }
    return Object.keys(items).length ? items : null;
  }
  const offline = () => typeof navigator !== 'undefined' && navigator.onLine === false;
  // gelijkzetten: het nieuwe koppelen als de server het kent, anders het oude
  async function koppelSync(stil, opties) {
    opties = opties || {};
    const K0 = leesK(); if (!K0 || !K0.code || bezigK) return null;
    const inst = await klaar, url = adres(inst); if (!url) return null;
    bezigK = true; laatsteSync = Date.now();
    try {
      if (await serverV3(inst)) { const j = await koppelSync3(stil, opties, K0, url); if (j) { IDB.uitWeg('sync'); LIVE.na(j); } if (j || (await serverV3(inst))) return j; }
      return await koppelSync2(stil, opties, K0, url);
    } catch (e) { return null; } finally { bezigK = false; eersteK = false; }
  }
  // ================================================================ LIVE (koppelen 2.0, fase 4): de deurbel
  // Met een kaartje uit het antwoord op /sync opent deze pagina een WebSocket naar de deurbel van haar account (de worker rommellive).
  // Zette dit apparaat iets op de server, dan belt het aan; belt een ander apparaat aan, dan zet deze pagina meteen gelijk. Valt de
  // verbinding weg, dan opnieuw, steeds wat later (tot 2 minuten). Zonder deurbel (een oude scoreserver) werkt alles zoals eerst.
  // Staat een spel met geld, muntjes of kaarten (geheel in de REGELS) ook op een ander apparaat open, dan vraagt de pagina die er als
  // laatste bij kwam waar je verder wilt spelen, net als bij twee tabbladen.
  const leesJSON = t => { if (typeof t !== 'string') return null; try { return JSON.parse(t); } catch (e) { return null; } };
  const liveHaak = {};
  // welke spellen in een ander tabblad (van deze site) open staan: elk spel houdt een slot vast (Web Locks)
  const SLOT = 'rommelhoekje-pagina:', spelPagina = !!pagina && pagina !== 'index' && SLEUTELS.some(k => vanDezePagina(k));
  async function openElders() {
    let namen = [];
    try { if (navigator.locks && navigator.locks.query) { const q = await navigator.locks.query(); namen = (q.held || []).map(l => l.name).filter(n => n && n.startsWith(SLOT)).map(n => n.slice(SLOT.length)); } } catch (e) {}
    const anders = namen.filter(p => p && p !== pagina);
    return k => anders.some(p => k.startsWith(EIGEN[p] || p));
  }
  const LIVE = (() => {
    const kan = typeof WebSocket !== 'undefined' && !!APPARAAT;
    const TAB = Math.random().toString(36).slice(2, 10).replace(/[^a-z0-9]/g, '') || 'tab0';
    const PAG = SLEUTELS.some(k => vanDezePagina(k) && k !== 'rommelblok-v2' && (REGELS.soort(k) === 'geheel' || !!(REGELS.SPEL[k] || {}).geld)) ? (pagina + (location.hash === '#wedstrijd' ? '-wedstrijd' : '')).toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 48) : null;
    let ws = null, wsCode = '', kaartCode = '', isOpen = false, kaart = null, kaartT = 0, wacht = 1000, poging = null, pingKlok = null, pongT = 0, opAf = null, stop = false, dicht = false;
    const zend = m => { try { if (ws && isOpen) ws.send(typeof m === 'string' ? m : JSON.stringify(m)); } catch (e) {} };
    const rust = ms => new Promise(ok => setTimeout(ok, ms));
    // na elk gelijkzetten: een nieuw kaartje bewaren, en aanbellen als dit apparaat iets op de server zette
    const sluit = () => { if (!ws) return; const s = ws; ws = null; isOpen = false; clearTimeout(pingKlok); try { s.close(1000); } catch (e) {} };
    function na(j) {
      if (!kan || !j) return;
      // een andere koppelcode (een code ingevuld, of een nieuw account): de deurbel van het nieuwe account
      const code = (leesK() || {}).code || '';
      if (ws && wsCode !== code) sluit();
      const s = {}; for (const [k, g] of Object.entries(j.gezet || {})) if (g && typeof g.t === 'number') s[k] = g.t;
      for (const k of Object.keys(j.vervangen || {})) if (j.items && j.items[k] && typeof j.items[k].t === 'number') s[k] = j.items[k].t;   // samengevoegd: ook nieuw
      if (Object.keys(s).length) zend({ t: 'nieuw', s });
      if (j.live && typeof j.live.k === 'string' && /^(wss:\/\/[a-z0-9.-]+|ws:\/\/(localhost|127\.0\.0\.1))(:\d+)?\/live$/.test(j.live.url || '')) { kaart = j.live; kaartT = Date.now(); kaartCode = code; if (!ws && !stop && !dicht) { clearTimeout(poging); poging = null; verbind(); } }
    }
    async function verbind() {
      poging = null;
      if (!kan || ws || stop || dicht) return;
      // een kaartje is twee minuten geldig: anders eerst gelijkzetten (dan missen we ook niets van wat er intussen gebeurde)
      if (!kaart || Date.now() - kaartT > 100000) { kaart = null; const j = await koppelSync(true); if (!j) opnieuw(); return; }
      const k = kaart; kaart = null; wsCode = kaartCode;
      let s; try { s = new WebSocket(k.url + '?k=' + encodeURIComponent(k.k) + '&tab=' + TAB); } catch (e) { opnieuw(); return; }
      ws = s; let sinds = 0;
      s.onopen = () => { if (ws !== s) return; isOpen = true; sinds = Date.now(); pongT = sinds; if (PAG) zend({ t: 'open', p: PAG }); klop(); };
      s.onmessage = e => { if (ws !== s) return; if (e.data === 'q') { pongT = Date.now(); return; } const m = leesJSON(e.data); if (m && typeof m === 'object') ontvang(m); };
      s.onclose = e => {
        if (ws !== s) return; ws = null; isOpen = false; clearTimeout(pingKlok);
        if (opAf) { const f = opAf; opAf = null; f(); }
        if (sinds && Date.now() - sinds > 30000) wacht = 1000;
        if (e.code !== 4000) opnieuw();   // 4000: er staan te veel pagina's van dit account open; dan pas weer bij terugkomen
      };
      s.onerror = () => {};
    }
    function opnieuw() { if (stop || dicht || ws || poging) return; const ms = Math.round(wacht * (0.7 + Math.random() * 0.6)); wacht = Math.min(120000, wacht * 2); poging = setTimeout(verbind, ms); }
    // elke 50 seconden even kloppen (de deurbel antwoordt zonder wakker te worden); kwam er te lang niets terug, dan opnieuw verbinden
    function klop() { clearTimeout(pingKlok); pingKlok = setTimeout(() => { if (!isOpen) return; if (Date.now() - pongT > 110000) { try { ws.close(); } catch (e) {} return; } zend('p'); klop(); }, 50000); }
    function nuMeteen() { if (stop || dicht || ws) return; clearTimeout(poging); poging = null; wacht = 1000; verbind(); }
    // een seintje van een ander apparaat
    function ontvang(m) {
      if (m.t === 'nieuw') {
        const s = m.s && typeof m.s === 'object' ? m.s : {}, sinds = Date.now();
        if (s['koppel~gelukt']) try { dispatchEvent(new CustomEvent('rommelhoekje-gekoppeld')); } catch (e) {}
        const bekend = () => { const st = (leesK() || {}).staat || {}; return Object.keys(s).length > 0 && Object.entries(s).every(([k, t]) => !SLEUTELS.includes(k) || (st[k] && (st[k].t || 0) >= t)); };
        if (!m.alles && bekend()) return;   // al bekend (een ander tabblad van dit apparaat zette al gelijk)
        const haal = async () => {
          if (!m.alles ? bekend() : !spelPagina && ((leesK() || {}).laatst || 0) > sinds) return;
          for (let i = 0; i < 30 && bezigK; i++) await rust(300);
          await koppelSync(true);
        };
        // de tabbladen van dit apparaat één voor één (dan zet er maar één gelijk, en komt hulp maar één keer aan)
        setTimeout(() => { try { if (navigator.locks && navigator.locks.request) { navigator.locks.request('rommelhoekje-live-sync', haal).catch(() => {}); return; } } catch (e) {} haal(); }, 60 + Math.random() * 300);
      }
      else if (m.t === 'ook' && PAG && m.p === PAG) vraag();
      else if (m.t === 'geef' && PAG && m.p === PAG) geefAf();
      else if (m.t === 'af' && opAf) { const f = opAf; opAf = null; f(); }
    }
    // ---- hetzelfde spel open op twee apparaten: waar wil je verder spelen?
    let vraagOpen = false;
    function vraag() {
      if (vraagOpen || stop || !document.body) return; vraagOpen = true;
      // een echt venster (showModal): dat komt boven alles, ook boven een venster dat het spel zelf al open had (zoals de dagbonus)
      if (!document.getElementById('kp-ook-stijl')) { const st = document.createElement('style'); st.id = 'kp-ook-stijl'; st.textContent = 'dialog.kp-ook{border:0;border-radius:14px;padding:1.2rem 1.3rem;margin:auto;max-width:min(26rem,94vw);background:#FBF6E9;color:#231A26;box-shadow:0 10px 40px rgba(0,0,0,.4);font-family:system-ui,sans-serif}dialog.kp-ook::backdrop{background:rgba(10,14,30,.75)}'; document.head.appendChild(st); }
      const w = document.createElement('dialog'); w.className = 'kp-ook'; w.setAttribute('role', 'alertdialog'); w.setAttribute('aria-labelledby', 'kp-ook-kop');
      w.addEventListener('cancel', e => e.preventDefault());
      w.innerHTML = '<h2 id="kp-ook-kop" style="margin:0 0 .4rem">Dit spel staat ook open op een ander apparaat</h2><p data-tekst style="margin:0 0 .9rem;line-height:1.45">Als je op twee apparaten tegelijk speelt, telt straks maar één van de twee. De andere bewaren we wel 30 dagen in de tijdmachine. Waar wil je verder spelen?</p><p data-knoppen style="display:flex;gap:.5rem;flex-wrap:wrap;margin:0"><button type="button" data-hier style="font:inherit;font-weight:800;border:0;border-radius:8px;padding:.6rem .9rem;background:#C8323C;color:#fff;cursor:pointer">Hier verder spelen</button><button type="button" data-daar style="font:inherit;font-weight:800;border:0;border-radius:8px;padding:.6rem .9rem;background:#E3D9CA;color:#231A26;cursor:pointer">Op het andere apparaat</button></p>';
      document.body.appendChild(w); try { w.showModal(); } catch (e) { w.setAttribute('open', ''); } try { w.querySelector('[data-hier]').focus(); } catch (e) {}
      w.querySelector('[data-hier]').onclick = async () => {
        w.querySelector('[data-knoppen]').remove(); w.querySelector('[data-tekst]').textContent = 'Even je voortgang van je andere apparaat ophalen…';
        const af = new Promise(ok => { opAf = ok; setTimeout(ok, 6000); });
        zend({ t: 'neem', p: PAG }); await af; opAf = null;
        for (let i = 0; i < 30 && bezigK; i++) await rust(300);
        await koppelSync(true, { herlaad: true });   // staat daar iets nieuwers, dan herlaadt de pagina daarmee
        w.remove(); vraagOpen = false;
      };
      w.querySelector('[data-daar]').onclick = () => { stop = true; try { sessionStorage.setItem('ander-apparaat', '1'); } catch (e) {} location.replace('./'); };
    }
    // een ander apparaat speelt hier verder: eerst versturen wat dit apparaat nog heeft, dan stoppen (naar de homepage, met uitleg)
    async function geefAf() {
      if (stop) return; stop = true;
      for (let i = 0; i < 20 && bezigK; i++) await rust(300);
      try { await koppelSync(true); } catch (e) {}
      zend({ t: 'af', p: PAG });
      try { sessionStorage.setItem('ander-apparaat', '1'); } catch (e) {}
      location.replace('./');
    }
    if (kan) {
      addEventListener('online', nuMeteen);
      document.addEventListener('visibilitychange', () => { if (!document.hidden) nuMeteen(); });
      // bij weggaan dicht (dan kan de browser de pagina bewaren voor de terugknop), en bij terugkomen weer open
      addEventListener('pagehide', () => { dicht = true; clearTimeout(poging); poging = null; if (ws) { const s = ws; ws = null; isOpen = false; clearTimeout(pingKlok); try { s.close(1000); } catch (e) {} } });
      addEventListener('pageshow', e => { if (e.persisted) { dicht = false; nuMeteen(); } });
    }
    // open: is de deurbel open (eventueel: voor dit account)
    return { kan, na, open: code => isOpen && (!code || code === wsCode), uit: () => { stop = true; clearTimeout(poging); poging = null; sluit(); }, PAG };
  })();
  // een spel dat wat er op een ander apparaat gebeurde meteen kan laten zien (zonder te herladen): Scorebord.live(sleutel, f).
  // f(nieuweStand, tekst) zet de nieuwe stand in het spel (de opslag zelf zet het blok daarna neer); geeft f false, dan kan het nu niet
  // (bijvoorbeeld midden in een puzzel), en gaat het zoals altijd. Alleen voor spellen die kunnen samenvoegen (niet geheel in de REGELS).
  function live(sleutel, f) { if (typeof f === 'function' && SLEUTELS.includes(sleutel) && vanDezePagina(sleutel) && REGELS.soort(sleutel) !== 'geheel') liveHaak[sleutel] = f; }
  // dit spel staat open (voor de andere tabbladen, zie openElders)
  if (spelPagina) try { if (navigator.locks && navigator.locks.request) { let los = null; const pak = () => navigator.locks.request(SLOT + pagina, { mode: 'shared' }, () => new Promise(ok => { los = ok; })).catch(() => {}); pak(); addEventListener('pagehide', () => { if (los) { los(); los = null; } }); addEventListener('pageshow', e => { if (e.persisted && !los) pak(); }); } } catch (e) {}
  const WOORD1 = ['rode', 'gele', 'blauwe', 'groene', 'paarse', 'gouden', 'zilveren', 'vrolijke', 'snelle', 'slimme', 'dappere', 'stille', 'grote', 'kleine', 'gekke', 'warme'];
  const WOORD2 = ['vlaai', 'raket', 'zolder', 'kraan', 'lamp', 'vos', 'uil', 'beer', 'trommel', 'vlieger', 'ster', 'koepel', 'piano', 'wolk', 'kikker', 'draak', 'tram', 'molen', 'sok', 'hoed', 'fiets', 'toren', 'boot', 'pinguin'];
  function maakCode() { const a = new Uint32Array(5); crypto.getRandomValues(a); return [WOORD1[a[0] % WOORD1.length], WOORD2[a[1] % WOORD2.length], WOORD2[a[2] % WOORD2.length], WOORD2[a[3] % WOORD2.length], 1000 + a[4] % 9000].join('-'); }
  const schoon = c => (c || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  async function maakKoppeling() { const K = { code: maakCode(), staat: {}, v: 2 }; schrijfK(K); await koppelSync(true); return K.code; }
  const vrij = async () => { for (let i = 0; i < 40 && bezigK; i++) await new Promise(r => setTimeout(r, 250)); };
  // je voortgang (en je Rommelbeesten-verzameling) van de server halen; daarna bewaart dit apparaat niets meer op de server, tot je zelf weer een koppelcode maakt
  async function verwijderAccount() {
    const K = leesK(); if (!K || !K.code) return '';
    const inst = await klaar, u = adres(inst); if (!u) return 'Er is geen verbinding met de server.';
    let rb = ''; try { const s = JSON.parse(localStorage.getItem('rommelbeesten-speler') || 'null'); if (s && s.geheim) rb = String(s.geheim); } catch (e) {}
    try { const r = await metTijd(u + '/account/weg', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ code: K.code, rb }) }); const j = await r.json().catch(() => ({})); if (r.status === 404) return 'Dit kan nog niet: de server krijgt binnenkort een nieuwe versie. Stuur Ruben anders een berichtje via de ideeënbox (kies Mijn gegevens).'; if (!r.ok) return j.fout || 'Dat lukte niet. Probeer het later opnieuw.'; } catch (e) { return 'Dat lukte niet. Controleer je internet en probeer het opnieuw.'; }
    if (API.doetMee()) await API.stopEnVerwijder();
    schrijfK({ uit: true, sinds: Date.now() }); IDB.leeg(); LIVE.uit();
    return '';
  }
  // het bericht als Ruben je hielp: je ziet altijd wat hij deed
  function toonHulp(lijst) {
    if (!lijst || !lijst.length) return;
    if (!document.body) { addEventListener('DOMContentLoaded', () => toonHulp(lijst)); return; }
    stijl();
    const d = document.createElement('dialog'); d.className = 'kp-dlg'; d.setAttribute('aria-labelledby', 'kp-hulp-kop');
    const cadeau = lijst.every(b => b.cadeau), binnen = document.createElement('div'); binnen.className = 'kp-in';
    const kop = document.createElement('h2'); kop.id = 'kp-hulp-kop'; kop.textContent = cadeau ? '🎁 Een cadeautje van Ruben' : '🛠️ Ruben heeft je geholpen'; binnen.appendChild(kop);
    for (const b of lijst) {
      if (b.titel) { const s = document.createElement('p'); s.className = 'kp-klein'; s.style.margin = '.6rem 0 0'; s.style.fontWeight = '800'; s.textContent = b.titel; binnen.appendChild(s); }
      const p = document.createElement('p'); p.className = 'kp-bericht'; p.style.fontSize = '1.05rem'; p.textContent = '“' + b.bericht + '”'; binnen.appendChild(p);
    }
    const klein = document.createElement('p'); klein.className = 'kp-klein'; klein.innerHTML = 'Ruben ziet alleen dat je dit bericht hebt gezien. Meer over je gegevens lees je in de <a href="privacy.html">privacyverklaring</a>.'; binnen.appendChild(klein);
    const rij = document.createElement('div'); rij.className = 'kp-rij'; const knop = document.createElement('button'); knop.type = 'button'; knop.className = 'kp-knop kp-hoofd'; knop.textContent = cadeau ? 'Dank je wel!' : 'Fijn, dank je!'; rij.appendChild(knop); binnen.appendChild(rij); d.appendChild(binnen);
    let klaarGezien = false;
    const gezien = () => { if (klaarGezien) return; klaarGezien = true; const H = leesH(); for (const b of lijst) if (!H.gezien.includes(b.nr)) H.gezien.push(b.nr); schrijfH(H); setTimeout(() => koppelSync(true), 400); };
    knop.onclick = () => { gezien(); if (d.open) d.close(); d.remove(); };
    d.addEventListener('close', () => { gezien(); d.remove(); });
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
    knop.focus();
  }
  async function gebruikCode(code, zeker) {
    code = schoon(code); if (code.length < 12) return 'Die code is te kort.';
    const inst = await klaar, u = adres(inst), mis = 'Koppelen lukte niet. Controleer je internet en probeer het opnieuw.'; if (!u) return mis;
    // eerst kijken of er iets bij deze code staat (zonder iets te versturen)
    if (zeker !== true) try { const r = await metTijd(u + '/sync', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ v: 2, code, alleenAantal: 1 }) }); const j = await r.json(); if (!j.ok) return mis; if (!j.aantal) return 'Bij deze code staat nog niets. Klopt hij wel? Maak hem anders op je andere apparaat.'; } catch (e) { return mis; }
    // dan koppelen: wat op allebei staat, beslist de server per spel (de meeste voortgang wint, de andere versie blijft bewaard); wat alleen hier staat, gaat mee
    await vrij(); const oud = leesK(); schrijfK({ code, staat: {}, v: 2 });
    const j = await koppelSync(true, { koppelen: true, herlaad: true });
    if (!j) { schrijfK(oud); return mis; }
    return '';
  }
  // ---------- een QR-code maken (eigen code, zonder bibliotheek): bytes, foutcorrectie M (15%), versie 1 tot 10 (tot 213 tekens).
  // Volgens de norm ISO/IEC 18004: Reed-Solomon over GF(256), de acht maskers en de strafpunten, en een SVG om te tekenen.
  const QR = (() => {
    const ECC = [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26], BLOK = [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5];   // per versie, bij foutcorrectie M
    const keer = (x, y) => { let z = 0; for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11d); z ^= ((y >>> i) & 1) * x; } return z; };
    const ruw = v => { let r = (16 * v + 128) * v + 64; if (v >= 2) { const n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; } return r; };
    const data = v => Math.floor(ruw(v) / 8) - ECC[v] * BLOK[v];
    function rs(dat, n) {
      const d = new Array(n).fill(0); d[n - 1] = 1; let w = 1;
      for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) { d[j] = keer(d[j], w); if (j + 1 < n) d[j] ^= d[j + 1]; } w = keer(w, 2); }
      const r = new Array(n).fill(0);
      for (const b of dat) { const f = b ^ r.shift(); r.push(0); for (let i = 0; i < n; i++) r[i] ^= keer(d[i], f); }
      return r;
    }
    function maak(tekst) {
      const by = Array.from(new TextEncoder().encode(tekst)); let v = 1;
      while (v <= 10 && 4 + (v < 10 ? 8 : 16) + by.length * 8 > data(v) * 8) v++;
      if (v > 10) return null;
      // de bits: soort (bytes), lengte, de tekst, een einde, en opvullen
      const bits = []; const zet = (x, n) => { for (let i = n - 1; i >= 0; i--) bits.push((x >>> i) & 1); };
      zet(4, 4); zet(by.length, v < 10 ? 8 : 16); for (const b of by) zet(b, 8);
      const cap = data(v) * 8; zet(0, Math.min(4, cap - bits.length)); zet(0, (8 - bits.length % 8) % 8);
      for (let p = 0xec; bits.length < cap; p ^= 0xec ^ 0x11) zet(p, 8);
      const cw = []; for (let i = 0; i < bits.length; i += 8) cw.push(parseInt(bits.slice(i, i + 8).join(''), 2));
      // in blokken, met foutcorrectie, en door elkaar
      const nb = BLOK[v], ne = ECC[v], tot = Math.floor(ruw(v) / 8), kort = nb - tot % nb, kl = Math.floor(tot / nb), blokken = [];
      for (let i = 0, k = 0; i < nb; i++) { const d = cw.slice(k, k + kl - ne + (i < kort ? 0 : 1)); k += d.length; const e = rs(d, ne); if (i < kort) d.push(0); blokken.push(d.concat(e)); }
      const alles = []; for (let i = 0; i < blokken[0].length; i++) blokken.forEach((b, j) => { if (i !== kl - ne || j >= kort) alles.push(b[i]); });
      // het raster: eerst de vaste patronen
      const N = 17 + 4 * v, m = [], vast = [];
      for (let i = 0; i < N; i++) { m.push(new Array(N).fill(false)); vast.push(new Array(N).fill(false)); }
      const vak = (x, y, d) => { m[y][x] = d; vast[y][x] = true; };
      for (let i = 0; i < N; i++) { vak(6, i, i % 2 === 0); vak(i, 6, i % 2 === 0); }
      for (const [cx, cy] of [[3, 3], [N - 4, 3], [3, N - 4]]) for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const x = cx + dx, y = cy + dy, a = Math.max(Math.abs(dx), Math.abs(dy)); if (x >= 0 && x < N && y >= 0 && y < N) vak(x, y, a !== 2 && a !== 4); }
      if (v >= 2) {
        const na = Math.floor(v / 7) + 2, stap = Math.ceil((v * 4 + 4) / (na * 2 - 2)) * 2, pos = [6];
        for (let p = N - 7; pos.length < na; p -= stap) pos.splice(1, 0, p);
        pos.forEach((x, i) => pos.forEach((y, j) => { if ((i === 0 && j === 0) || (i === 0 && j === na - 1) || (i === na - 1 && j === 0)) return; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) vak(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }));
      }
      const formaat = mask => {
        const d = (0 << 3) | mask; let r = d; for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
        const b = ((d << 10) | r) ^ 0x5412, bit = i => ((b >>> i) & 1) === 1;
        for (let i = 0; i <= 5; i++) vak(8, i, bit(i));
        vak(8, 7, bit(6)); vak(8, 8, bit(7)); vak(7, 8, bit(8));
        for (let i = 9; i < 15; i++) vak(14 - i, 8, bit(i));
        for (let i = 0; i < 8; i++) vak(N - 1 - i, 8, bit(i));
        for (let i = 8; i < 15; i++) vak(8, N - 15 + i, bit(i));
        vak(8, N - 8, true);
      };
      formaat(0);
      if (v >= 7) { let r = v; for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1f25); const b = (v << 12) | r; for (let i = 0; i < 18; i++) { const d = ((b >>> i) & 1) === 1, a = N - 11 + i % 3, c = Math.floor(i / 3); vak(a, c, d); vak(c, a, d); } }
      // de gegevens, in de zigzag van rechtsonder
      let i = 0;
      for (let r = N - 1; r >= 1; r -= 2) {
        if (r === 6) r = 5;
        for (let s = 0; s < N; s++) for (let j = 0; j < 2; j++) { const x = r - j, y = ((r + 1) & 2) === 0 ? N - 1 - s : s; if (!vast[y][x] && i < alles.length * 8) { m[y][x] = ((alles[i >>> 3] >>> (7 - (i & 7))) & 1) === 1; i++; } }
      }
      // het masker met de minste strafpunten
      const MASK = [(x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, x => x % 3 === 0, (x, y) => (x + y) % 3 === 0, (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => (x * y) % 2 + (x * y) % 3 === 0, (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0, (x, y) => ((x + y) % 2 + (x * y) % 3) % 2 === 0];
      const pas = k => { for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!vast[y][x] && MASK[k](x, y)) m[y][x] = !m[y][x]; };
      const straf = () => {
        let p = 0, donker = 0;
        const lijn = rij => { let s = 0; for (let a = 0, n = 1; a < N; a++) { if (a + 1 < N && rij[a + 1] === rij[a]) n++; else { if (n >= 5) s += n - 2; n = 1; } } const t = rij.map(x => (x ? 1 : 0)).join(''); for (let a = t.indexOf('1011101'); a >= 0; a = t.indexOf('1011101', a + 1)) if (t.slice(Math.max(0, a - 4), a) === '0000'.slice(0, Math.min(4, a)) || t.slice(a + 7, a + 11) === '0000'.slice(0, Math.min(4, N - a - 7))) s += 40; return s; };
        for (let y = 0; y < N; y++) { p += lijn(m[y]); p += lijn(m.map(r => r[y])); }
        for (let y = 0; y < N - 1; y++) for (let x = 0; x < N - 1; x++) if (m[y][x] === m[y][x + 1] && m[y][x] === m[y + 1][x] && m[y][x] === m[y + 1][x + 1]) p += 3;
        for (const r of m) for (const x of r) if (x) donker++;
        return p + Math.floor(Math.abs(donker * 20 - N * N * 10) / (N * N)) * 10;
      };
      let best = 0, laagst = Infinity;
      for (let k = 0; k < 8; k++) { pas(k); formaat(k); const s = straf(); if (s < laagst) { laagst = s; best = k; } pas(k); }
      pas(best); formaat(best);
      return m;
    }
    // als SVG (donker op licht, met de rustige rand van 4 vakjes eromheen)
    function svg(tekst, label) {
      const m = maak(tekst); if (!m) return '';
      const N = m.length, W = N + 8; let d = '';
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (m[y][x]) { let n = 1; while (x + n < N && m[y][x + n]) n++; d += 'M' + (x + 4) + ' ' + (y + 4) + 'h' + n + 'v1h-' + n + 'z'; x += n - 1; }
      return `<svg class="kp-qr" viewBox="0 0 ${W} ${W}" role="img" aria-label="${label || 'QR-code'}" shape-rendering="crispEdges"><rect width="${W}" height="${W}" fill="#fff"/><path d="${d}" fill="#231A26"/></svg>`;
    }
    return { maak, svg };
  })();
  // ---------- koppelen met een QR-code, en je account bewaren met een passkey (fase 5)
  // Een QR-code: het apparaat met een account vraagt de server om een koppelbewijs (8 tekens, 5 minuten, één keer) en toont het als
  // QR-code naar de homepage (#koppel=...). Het andere apparaat vraagt eerst of je wilt koppelen, en krijgt dan van de server de
  // koppelcode. Het eerste apparaat hoort dat via de deurbel ('koppel~gelukt'), of kijkt zelf elke paar seconden.
  // Een passkey (Face ID, Touch ID of de pincode van je apparaat): de server bewaart de koppelcode versleuteld bij de passkey, en geeft
  // hem terug als de passkey een goede handtekening zet. De passkey heet 'Rommelhoekje-account' en staat los van die van de werkplaats.
  const kpStatus = () => { try { return JSON.parse(localStorage.getItem(KV) || 'null') || {}; } catch (e) { return {}; } };
  const qrKan = () => !!kpStatus().qr;
  const pkKan = () => { const rp = kpStatus().pk; try { return !!rp && !!window.PublicKeyCredential && !!(navigator.credentials && navigator.credentials.create) && (location.hostname === rp || location.hostname.endsWith('.' + rp)); } catch (e) { return false; } };
  const BEWIJS_TEKENS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', GEKOPPELD = 'Gekoppeld! Je speelt hier nu verder met dezelfde voortgang als op je andere apparaat.';
  const schoonBewijs = b => String(b || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const isBewijs = b => b.length === 8 && [...b].every(c => BEWIJS_TEKENS.includes(c));
  const b64u = b => naarB64(new Uint8Array(b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const vanB64u = s => vanB64(String(s).replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - String(s).length % 4) % 4));
  async function kpPost(pad, lijf) {
    const inst = await klaar, u = adres(inst); if (!u) throw new Error('Er is geen verbinding met de server.');
    let r; try { r = await metTijd(u + pad, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(lijf || {}) }); } catch (e) { throw new Error('Dat lukte niet. Controleer je internet.'); }
    const j = await r.json().catch(() => null);
    if (!j || !j.ok) { const f = new Error(j && j.fout && !/^Niet gevonden$/.test(j.fout) ? j.fout : 'Dat lukte niet. Probeer het zo nog eens.'); f.j = j || {}; throw f; }
    return j;
  }
  // de 8 tekens onder een QR-code (of uit het adres): de server geeft de koppelcode, en dan koppelen zoals met een gewone code
  async function koppelMetBewijs(B) {
    let j; try { j = await kpPost('/koppel/gebruik', { bewijs: B }); } catch (e) { return e.message; }
    const K = leesK(); if (K && K.code === j.code) return '';
    return gebruikCode(j.code, true);
  }
  // op het nieuwe apparaat: een QR-code gescand (de homepage met #koppel=...). Nooit vanzelf koppelen: eerst vragen.
  let bewijsWacht = false;
  function koppelVraag(B) {
    maakDlg(); qrSessie = null; dlg.dataset.scherm = 'vraag';
    const K = leesK();
    dlg.innerHTML = `<div class="kp-in"><h2>Dit apparaat koppelen?</h2><p>Je hebt de QR-code van je andere apparaat gescand. Koppel je dit apparaat, dan speel je hier verder met dezelfde voortgang als daar.</p>${K && K.code ? '<p class="kp-klein">Wat al op dit apparaat staat, gaat mee. Speelde je een spel op allebei, dan wint de meeste voortgang; de andere versie blijft bewaard.</p>' : ''}<p class="kp-klein">Koppel alleen als je de QR-code zelf hebt gemaakt, op je eigen apparaat. Speel je op dit apparaat in de app op je beginscherm? Open die dan, en vul daar de 8 tekens onder de QR-code in.</p><p class="kp-fout" id="kp-fout" role="status"></p><div class="kp-rij"><button class="kp-knop kp-hoofd" id="kp-ja" type="button">Ja, koppel</button><button class="kp-knop" id="kp-nee" type="button">Nee</button></div></div>`;
    const q = id => dlg.querySelector('#' + id);
    const klaarMet = () => { if (!bewijsWacht) return; bewijsWacht = false; const K2 = leesK(); if (!K2 || (!K2.code && !K2.uit)) maakKoppeling().catch(() => {}); };
    q('kp-nee').onclick = () => dlg.close();
    q('kp-ja').onclick = async () => { q('kp-ja').disabled = true; q('kp-fout').textContent = 'Even bezig...'; const f = await koppelMetBewijs(B); if (f) { q('kp-ja').disabled = false; q('kp-fout').textContent = f; return; } bewijsWacht = false; openKoppel(GEKOPPELD); };
    dlg.addEventListener('close', klaarMet, { once: true });
    if (!dlg.open) dlg.showModal(); q('kp-ja').focus();
  }
  // op het apparaat met een account: de QR-code tonen, aftellen, en kijken of hij gebruikt is
  let qrSessie = null;
  async function koppelQR() {
    const mijn = qrSessie = {}, K = leesK(); if (!K || !K.code) return openKoppel();
    dlg.dataset.scherm = 'qr';
    let af = false;
    const zet = html => { if (qrSessie !== mijn) return; dlg.innerHTML = '<div class="kp-in"><h2>📱 Koppel een ander apparaat</h2>' + html + '</div>'; const t = dlg.querySelector('#kp-terug'); if (t) t.onclick = () => { stop(); openKoppel(); }; const n = dlg.querySelector('#kp-nieuw'); if (n) n.onclick = () => { stop(); koppelQR(); }; const f = dlg.querySelector('.kp-knop.kp-hoofd') || t; if (f) f.focus(); };
    const terug = '<button class="kp-knop" type="button" id="kp-terug">Terug</button>';
    const seintje = () => kijk();
    const stop = () => { if (qrSessie === mijn) qrSessie = null; removeEventListener('rommelhoekje-gekoppeld', seintje); };
    dlg.addEventListener('close', stop, { once: true }); addEventListener('rommelhoekje-gekoppeld', seintje);
    zet('<p class="kp-klein" role="status">Even een code maken...</p>');
    let j; try { await vrij(); j = await kpPost('/koppel/bewijs', { code: K.code }); } catch (e) { zet(`<p class="kp-fout" role="alert">${tmEsc(e.message)}</p><div class="kp-rij">${terug}</div>`); return; }
    const B = j.bewijs, eind = Date.now() + (j.geldig || 300) * 1000, url = new URL('./', location.href).href + '#koppel=' + B;
    zet(`<p>Scan deze QR-code met de camera van je andere apparaat:</p>${QR.svg(url, 'QR-code om een ander apparaat te koppelen')}<p class="kp-klein kp-midden">Lukt scannen niet? Open dan dit venster op je andere apparaat, kies <b>Al een account op een ander apparaat?</b> en vul deze 8 tekens in:</p><div class="kp-code kp-bewijs">${B.slice(0, 4)}-${B.slice(4)}</div><p class="kp-klein kp-midden" id="kp-klok"></p><div class="kp-rij">${terug}</div>`);
    const verlopen = () => { if (af) return; af = true; zet(`<p>Deze code is verlopen. Een code werkt 5 minuten, en één keer.</p><div class="kp-rij"><button class="kp-knop kp-hoofd" type="button" id="kp-nieuw">Maak een nieuwe code</button>${terug}</div>`); };
    async function kijk() {
      if (qrSessie !== mijn || af) return; let s; try { s = await kpPost('/koppel/stand', { code: K.code, bewijs: B }); } catch (e) { return; }
      if (qrSessie !== mijn || af) return;
      if (s.stand === 'gebruikt') { af = true; zet(`<p class="kp-goed" role="status">✅ Gekoppeld! Je andere apparaat speelt nu verder met dezelfde voortgang als hier.</p><div class="kp-rij"><button class="kp-knop kp-hoofd" type="button" id="kp-terug">Fijn!</button></div>`); setTimeout(() => koppelSync(true), 4000); }
      else if (s.stand !== 'wacht') verlopen();
    }
    const tik = () => { if (qrSessie !== mijn || af) return; const over = Math.max(0, Math.ceil((eind - Date.now()) / 1000)), el = dlg.querySelector('#kp-klok'); if (el) el.textContent = 'Nog ' + Math.floor(over / 60) + ':' + String(over % 60).padStart(2, '0') + ' geldig · één keer te gebruiken'; if (over <= 0) { kijk().then(verlopen); return; } setTimeout(tik, 1000); };
    const peil = () => { if (qrSessie !== mijn || af) return; kijk(); setTimeout(peil, LIVE.open() ? 15000 : 3000); };
    tik(); setTimeout(peil, 3000);
  }
  // ---------- de passkey
  const apparaatNaam = () => { const u = navigator.userAgent || ''; return /iPhone/.test(u) ? 'iPhone' : /iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1) ? 'iPad' : /Android/.test(u) ? 'Android' : /Macintosh|Mac OS X/.test(u) ? 'Mac' : /Windows/.test(u) ? 'Windows' : /CrOS/.test(u) ? 'Chromebook' : /Linux/.test(u) ? 'Linux' : 'apparaat'; };
  // de vraag van de server alvast ophalen, zodat de passkey meteen na de tik kan beginnen (Safari wil dat)
  let pkKlaar = {};
  const pkVooraf = (soort, code) => { pkKlaar[soort] = { t: Date.now(), p: kpPost(soort === 'terug' ? '/passkey/vraag' : '/passkey/begin', soort === 'terug' ? {} : { code }).catch(e => e) }; };
  const pkNeem = async (soort, code) => { const v = pkKlaar[soort]; delete pkKlaar[soort]; const j = v && Date.now() - v.t < 240000 ? await v.p : null; if (j && !(j instanceof Error)) return j; return kpPost(soort === 'terug' ? '/passkey/vraag' : '/passkey/begin', soort === 'terug' ? {} : { code }); };
  const pkFout = e => new Error(e && e.name === 'InvalidStateError' ? 'Op dit apparaat is je account al bewaard met een passkey.' : e && e.name === 'NotAllowedError' ? 'Dat is gestopt, of het duurde te lang. Probeer het nog eens.' : 'Dat lukte niet op dit apparaat.');
  async function pkBewaar() {
    const K = leesK(); if (!K || !K.code) throw new Error('Dit apparaat is niet gekoppeld.');
    const v = await pkNeem('maak', K.code);
    let c; try { c = await navigator.credentials.create({ publicKey: { challenge: vanB64u(v.challenge), rp: v.rp, user: { id: vanB64u(v.user.id), name: v.user.name, displayName: v.user.displayName }, pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }], authenticatorSelection: { residentKey: 'required', requireResidentKey: true, userVerification: 'required' }, attestation: 'none', timeout: 120000, excludeCredentials: (v.uitsluiten || []).map(id => ({ type: 'public-key', id: vanB64u(id) })) } }); } catch (e) { throw pkFout(e); }
    if (!c) throw pkFout();
    await kpPost('/passkey/klaar', { code: K.code, challenge: v.challenge, id: b64u(c.rawId), clientDataJSON: b64u(c.response.clientDataJSON), attestationObject: b64u(c.response.attestationObject), naam: apparaatNaam() });
  }
  async function pkTerug() {
    const v = await pkNeem('terug');
    let c; try { c = await navigator.credentials.get({ publicKey: { challenge: vanB64u(v.challenge), rpId: v.rpId, userVerification: 'required', timeout: 120000 } }); } catch (e) { pkVooraf('terug'); throw e && e.name === 'NotAllowedError' ? new Error('Er is geen passkey gekozen. Je passkey staat op het apparaat (of bij het wachtwoordprogramma) waar je hem maakte. Gebruik anders je koppelcode, of de QR-code van je andere apparaat.') : pkFout(e); }
    if (!c) throw pkFout();
    let j; try { j = await kpPost('/passkey/terug', { challenge: v.challenge, id: b64u(c.rawId), clientDataJSON: b64u(c.response.clientDataJSON), authenticatorData: b64u(c.response.authenticatorData), signature: b64u(c.response.signature), userHandle: c.response.userHandle ? b64u(c.response.userHandle) : null }); }
    catch (e) { pkVooraf('terug'); if (e.j && e.j.onbekend) try { const p = PublicKeyCredential.signalUnknownCredential({ rpId: v.rpId, credentialId: b64u(c.rawId) }); if (p && p.catch) p.catch(() => {}); } catch (x) {} throw e; }
    const K = leesK(); if (K && K.code === j.code) return true;
    const f = await gebruikCode(j.code, true); if (f) throw new Error(f);
    return false;
  }
  // in het venster 'Je account': is het account bewaard met een passkey, en de knoppen om er een te maken of ze weg te halen
  async function pkToon(plek, fout) {
    const K = leesK(); if (!K || !K.code) return;
    let lijst; try { lijst = (await kpPost('/passkey/lijst', { code: K.code })).lijst || []; } catch (e) { plek.remove(); return; }
    if (!plek.isConnected) return;
    const namen = [...new Set(lijst.map(p => p.naam || 'apparaat'))].map(tmEsc).join(', ');
    plek.innerHTML = lijst.length ? `<p class="kp-klein" style="margin:0">🔑 Je account is bewaard met ${lijst.length === 1 ? 'een passkey' : lijst.length + ' passkeys'} (${namen}). Daarmee haal je het terug op een nieuw apparaat, of als je browser leeg is gemaakt. <button class="kp-link" id="kp-pk-maak" type="button">Nog een passkey</button> · <button class="kp-link" id="kp-pk-weg" type="button">Weghalen</button></p>`
      : `<p class="kp-klein" style="margin:0 0 .4rem"><b>Je account bewaren zonder code?</b> Met een passkey haal je het terug met Face ID, Touch ID of de pincode van je apparaat, ook als je browser leeg is gemaakt. Geen e-mailadres, geen wachtwoord.</p><button class="kp-knop" id="kp-pk-maak" type="button">🔑 Bewaar met een passkey</button>`;
    if (lijst.length < 10) pkVooraf('maak', K.code);
    const m = plek.querySelector('#kp-pk-maak'), w = plek.querySelector('#kp-pk-weg');
    if (m) m.onclick = async () => { m.disabled = true; fout.textContent = 'Volg de stappen op je apparaat...'; try { await pkBewaar(); fout.textContent = ''; openKoppel('Je account is bewaard met een passkey. Op een nieuw apparaat kies je Koppel je apparaten, en dan Haal je account terug.'); } catch (e) { m.disabled = false; fout.textContent = e.message; } };
    if (w) w.onclick = async () => {
      if (!confirm('Je passkeys voor het Rommelhoekje-account weghalen?\n\nDan kun je je account niet meer terughalen met Face ID, Touch ID of je pincode. Je koppelcode en je voortgang blijven gewoon werken.')) return;
      fout.textContent = 'Even bezig...';
      try { const j = await kpPost('/passkey/weg', { code: K.code }); for (const id of j.weg || []) try { const p = PublicKeyCredential.signalUnknownCredential({ rpId: kpStatus().pk, credentialId: id }); if (p && p.catch) p.catch(() => {}); } catch (x) {} openKoppel('De passkeys zijn weggehaald. Staat er nog een in je wachtwoorden? Die kun je daar ook weghalen.'); } catch (e) { fout.textContent = e.message; }
    };
  }
  // ---------- het venster
  let dlg = null;
  function stijl() { if (document.getElementById('kp-stijl')) return; const st = document.createElement('style'); st.id = 'kp-stijl'; st.textContent = `
    .kp-dlg { border: 0; border-radius: 14px; padding: 0; max-width: min(30rem, 94vw); background: #F2DDA0; color: #231A26; box-shadow: 0 0 0 4px #231A26, 0 10px 0 4px rgba(0,0,0,.35); font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
    .kp-dlg::backdrop { background: rgba(10,14,30,.6); } .kp-in { padding: 1.1rem 1.3rem 1.2rem; } .kp-in h2 { margin: 0 0 .4rem; } .kp-in p { margin: .4rem 0; line-height: 1.45; }
    .kp-code { font-size: 1.4rem; font-weight: 800; letter-spacing: .02em; background: #FBF6E9; border-radius: 8px; padding: .6rem .8rem; text-align: center; margin: .6rem 0; user-select: all; }
    .kp-rij { display: flex; gap: .45rem; flex-wrap: wrap; margin-top: .6rem; } .kp-rij input { flex: 1 1 12rem; font: inherit; padding: .55rem .7rem; border-radius: 6px; border: 2px solid #C9A24E; background: #FBF6E9; }
    .kp-knop { font: inherit; font-weight: 800; border: 0; border-radius: 6px; padding: .55rem .9rem; cursor: pointer; background: #FBF6E9; color: #231A26; box-shadow: 0 2px 0 rgba(0,0,0,.3); } .kp-knop.kp-hoofd { background: #C8323C; color: #fff; }
    .kp-klein { font-size: .82rem; color: #5E5643; } .kp-klein a, .kp-link { color: #9E2430; font: inherit; font-weight: 700; } .kp-link { background: none; border: 0; padding: 0; cursor: pointer; text-decoration: underline; } .kp-fout { color: #C8323C; font-weight: 700; min-height: 1.2em; }
    .kp-lijst { list-style: none; margin: .6rem 0; padding: .15rem; max-height: min(50vh, 22rem); overflow: auto; display: grid; gap: .4rem; } .kp-dag { font-weight: 800; font-size: .82rem; margin-top: .3rem; }
    .kp-keus { width: 100%; text-align: left; font: inherit; border: 2px solid #231A26; border-radius: 8px; padding: .5rem .7rem; cursor: pointer; background: #FBF6E9; color: #231A26; display: grid; gap: .1rem; } .kp-keus span { font-size: .85rem; color: #5E5643; } .kp-keus:hover { background: #fff; }
    .kp-label { font-style: normal; font-size: .72rem; font-weight: 800; background: #C8323C; color: #fff; border-radius: 999px; padding: .05rem .45rem; margin-left: .25rem; white-space: nowrap; } .kp-dlg :focus-visible { outline: 3px solid #C8323C; outline-offset: 2px; }
    .kp-melding { position: fixed; left: 50%; bottom: 1rem; transform: translateX(-50%); z-index: 9999; background: #FBF6E9; color: #231A26; font: 700 .92rem 'Bricolage Grotesque', system-ui, sans-serif; padding: .6rem .9rem; border-radius: 10px; box-shadow: 0 0 0 3px #231A26, 0 6px 0 3px rgba(0,0,0,.3); display: flex; gap: .6rem; align-items: center; flex-wrap: wrap; justify-content: center; max-width: 92vw; }
    .kp-qr { display: block; width: min(15rem, 70vw); height: auto; margin: .5rem auto .3rem; border-radius: 10px; box-shadow: 0 0 0 3px #231A26; background: #fff; } .kp-bewijs { font-size: 1.7rem; letter-spacing: .14em; font-variant-numeric: tabular-nums; padding: .35rem .6rem; }
    .kp-goed { background: #DCEBCB; border-radius: 8px; padding: .5rem .7rem; font-weight: 700; } .kp-pk { margin: .8rem 0 .2rem; padding-top: .7rem; border-top: 2px dashed #C9A24E; } .kp-midden { text-align: center; }
    .kp-knopje { position: fixed; right: .9rem; bottom: .9rem; z-index: 50; font: 800 .88rem 'Bricolage Grotesque', system-ui, sans-serif; border: 0; border-radius: 999px; padding: .55rem .9rem; cursor: pointer; background: #FBF6E9; color: #231A26; box-shadow: 0 0 0 3px #231A26, 0 4px 0 3px rgba(0,0,0,.3); }`; document.head.appendChild(st); }
  function toonKoppelMelding(tekst, knop, doe) { stijl(); const m = document.createElement('div'); m.className = 'kp-melding'; m.setAttribute('role', 'status'); m.innerHTML = `<span>${tekst}</span>${knop ? `<button class="kp-knop kp-hoofd" type="button">${knop}</button>` : ''}`; if (knop) m.querySelector('button').onclick = () => { m.remove(); doe(); }; document.body.appendChild(m); setTimeout(() => m.remove(), knop ? 20000 : 4000); }
  function maakDlg() { stijl(); if (!dlg) { dlg = document.createElement('dialog'); dlg.className = 'kp-dlg'; document.body.appendChild(dlg); dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); } }
  function openKoppel(melding) {
    maakDlg(); qrSessie = null; if (typeof melding !== 'string') melding = '';
    const K = leesK();
    // weet dit apparaat nog niet wat de server kan (QR-code, passkey)? Dan even vragen, en het venster opnieuw tekenen
    if (!('qr' in kpStatus())) klaar.then(inst => serverV3(inst)).then(() => { if (dlg.open && dlg.dataset.scherm === 'account' && 'qr' in kpStatus()) openKoppel(melding); }).catch(() => {});
    const geleden = t => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'net' : m < 60 ? m + ' minuten geleden' : Math.round(m / 60) + ' uur geleden'; };
    dlg.dataset.scherm = 'account';
    dlg.innerHTML = K && K.code ? `<div class="kp-in"><h2>Je account</h2>${melding ? `<p class="kp-goed" role="status">${tmEsc(melding)}</p>` : ''}<p>Je voortgang staat veilig op de server. Met deze code haal je hem op een ander apparaat op, of terug als je browser leeg is gemaakt. Bewaar hem goed:</p><div class="kp-code">${K.code}</div><p class="kp-klein">Vul deze code in op een ander apparaat om ook daar verder te spelen. ${K.laatst ? 'Laatst gelijkgezet: ' + geleden(K.laatst) + '.' : ''}</p>${qrKan() ? '<div class="kp-rij"><button class="kp-knop kp-hoofd" id="kp-qr" type="button">📱 Koppel een ander apparaat</button></div>' : ''}${pkKan() ? '<div class="kp-pk" id="kp-pk"></div>' : ''}${qrKan() ? `<details class="kp-pk" id="kp-ander"><summary class="kp-klein" style="cursor:pointer"><b>Al een account op een ander apparaat?</b></summary><p class="kp-klein">Vul hier de koppelcode in, of de 8 tekens onder de QR-code op je andere apparaat. Dan gebruikt dit apparaat voortaan dat account; wat hier al staat, gaat mee.</p><div class="kp-rij"><input id="kp-invoer" placeholder="bijvoorbeeld rode-vlaai-raket-123" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Koppelcode of de 8 tekens onder de QR-code"><button class="kp-knop" id="kp-koppel" type="button">Koppelen</button></div>${pkKan() ? '<div class="kp-rij"><button class="kp-knop" id="kp-pk-terug" type="button">🔑 Haal je account terug met een passkey</button></div>' : ''}</details>` : ''}<p class="kp-fout" id="kp-fout"></p><div class="kp-rij"><button class="kp-knop${qrKan() ? '' : ' kp-hoofd'}" id="kp-nu" type="button">Nu gelijkzetten</button>${tmKan() ? '<button class="kp-knop" id="kp-tijd" type="button">⏪ Tijdmachine</button>' : ''}<button class="kp-knop" id="kp-los" type="button">Ontkoppelen</button><button class="kp-knop" id="kp-dicht" type="button">Sluiten</button></div><p class="kp-klein" style="margin-top:1rem">Wil je niet dat je voortgang op de server staat? <button class="kp-link" id="kp-weg" type="button">Verwijder mijn gegevens van de server</button>. Lees ook de <a href="privacy.html">privacyverklaring</a>.</p></div>`
      : `<div class="kp-in"><h2>Koppel je apparaten</h2>${K && K.uit ? '<p><b>Je voortgang staat nu alleen op dit apparaat.</b> Er gaat niets naar de server, tot je zelf een koppelcode maakt.</p>' : ''}<p>Speel je op een computer én op een telefoon of tablet? Koppel ze, dan gaat je voortgang in alle spellen mee: je vlaaien, je Rommelbeesten, het hotel, je records en meer.</p><div class="kp-rij"><button class="kp-knop kp-hoofd" id="kp-maak" type="button">Maak een koppelcode</button></div><p style="margin-top:1rem"><b>${qrKan() ? 'Al een account op een ander apparaat?' : 'Heb je al een code?'}</b> Vul hier je koppelcode in${qrKan() ? ', of de code van 8 tekens onder de QR-code op je andere apparaat' : ''}:</p><div class="kp-rij"><input id="kp-invoer" placeholder="bijvoorbeeld rode-vlaai-raket-123" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Koppelcode"><button class="kp-knop" id="kp-koppel" type="button">Koppelen</button></div>${qrKan() ? '<p class="kp-klein">Heeft je andere apparaat al een account? Kies daar <b>📱 Koppel een ander apparaat</b>, en scan de QR-code met de camera van dit apparaat.</p>' : ''}${pkKan() ? '<p style="margin-top:1rem"><b>Je account bewaard met een passkey?</b> Haal het terug met Face ID, Touch ID of je pincode:</p><div class="kp-rij"><button class="kp-knop" id="kp-pk-terug" type="button">🔑 Haal je account terug</button></div>' : ''}<p class="kp-fout" id="kp-fout"></p><p class="kp-klein">Je voortgang wordt zonder naam bewaard, alleen bij een versleutelde vorm van je code. Iedereen met je code kan je voortgang overnemen, dus deel hem alleen met je eigen apparaten.</p><div class="kp-rij"><button class="kp-knop" id="kp-dicht" type="button">Sluiten</button></div></div>`;
    const q = id => dlg.querySelector('#' + id); dlg.onclick = null;
    q('kp-dicht').onclick = () => dlg.close();
    if (q('kp-tijd')) q('kp-tijd').onclick = () => tijdmachine('');
    if (q('kp-maak')) q('kp-maak').onclick = async () => { q('kp-maak').disabled = true; q('kp-fout').textContent = 'Even bezig...'; await maakKoppeling(); openKoppel(); };
    // een koppelcode, of de 8 tekens onder een QR-code
    if (q('kp-koppel')) { const ga = async () => { q('kp-fout').textContent = 'Even bezig...'; const w = q('kp-invoer').value, B = schoonBewijs(w); const f = B.length === 8 && schoon(w).replace(/-/g, '').length === 8 ? await koppelMetBewijs(B) : await gebruikCode(w); if (f) q('kp-fout').textContent = f; else openKoppel(GEKOPPELD); }; q('kp-koppel').onclick = ga; q('kp-invoer').onkeydown = e => { if (e.key === 'Enter') ga(); }; }
    if (q('kp-qr')) q('kp-qr').onclick = () => koppelQR();
    if (q('kp-pk')) pkToon(q('kp-pk'), q('kp-fout'));
    if (q('kp-ander')) q('kp-ander').ontoggle = () => { if (q('kp-ander').open) { if (q('kp-pk-terug')) pkVooraf('terug'); q('kp-invoer').focus(); } };
    if (q('kp-pk-terug')) { if (!q('kp-ander')) pkVooraf('terug'); q('kp-pk-terug').onclick = async () => { const b = q('kp-pk-terug'); b.disabled = true; q('kp-fout').textContent = 'Kies je passkey...'; try { const al = await pkTerug(); openKoppel(al ? 'Dit apparaat gebruikt dit account al.' : 'Je account is terug! Je voortgang wordt nu opgehaald.'); } catch (e) { b.disabled = false; q('kp-fout').textContent = e.message; } }; }
    if (q('kp-nu')) q('kp-nu').onclick = async () => { q('kp-fout').textContent = 'Even bezig...'; const j = await koppelSync(true); q('kp-fout').textContent = j ? 'Alles is gelijkgezet.' : 'Dat lukte niet. Controleer je internet.'; };
    if (q('kp-weg')) q('kp-weg').onclick = async () => { if (!confirm('Je gegevens van de server halen?\n\nDan wissen we op de server: je voortgang van alle spellen, je Rommelbeesten-verzameling, je passkeys en, als je meedoet, je naam en scores op het scorebord. Op dit apparaat blijft je voortgang gewoon staan, maar je andere apparaten krijgen hem niet meer.\n\nDit apparaat bewaart daarna niets meer op de server, tot je zelf weer een koppelcode maakt.')) return; q('kp-fout').textContent = 'Even bezig...'; const f = await verwijderAccount(); if (f) { q('kp-fout').textContent = f; return; } openKoppel(); toonKoppelMelding('Je gegevens zijn van de server gehaald.'); };
    if (q('kp-los')) q('kp-los').onclick = () => { if (!confirm('Ontkoppelen? Je voortgang blijft op dit apparaat staan, maar gaat niet meer mee naar je andere apparaten.')) return; schrijfK(null); IDB.leeg(); openKoppel(); };
    if (!dlg.open) dlg.showModal();
  }
  // ---------- de tijdmachine: eerdere versies van je spellen (30 dagen) bekijken en terugzetten, op al je apparaten tegelijk
  const TM_SOORT = { botsing: 'van je andere apparaat', samen: 'van vóór het samenvoegen', opnieuw: 'van vóór opnieuw beginnen', weg: 'van vóór weghalen', hulp: 'van vóór hulp van Ruben', terug: 'van vóór terugzetten', dag: 'reservekopie' };
  const tmKan = () => { try { const c = JSON.parse(localStorage.getItem(KV) || 'null'); return !!(c && c.tm); } catch (e) { return false; } };
  const tmEsc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tmDag = t => { const d = new Date(t), n = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(t).setHours(0, 0, 0, 0)) / 864e5); return n === 0 ? 'Vandaag' : n === 1 ? 'Gisteren' : d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' }); };
  const tmUur = t => new Date(t).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  async function tmVraag(pad, lijf) {
    const K = leesK(), inst = await klaar, url = adres(inst); if (!K || !K.code || !url) throw new Error('Dit apparaat is niet gekoppeld.');
    let r; try { r = await metTijd(url + pad, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(Object.assign({ code: K.code }, lijf)) }); } catch (e) { throw new Error('Dat lukte niet. Controleer je internet.'); }
    const j = await r.json().catch(() => null);
    if (j && j.fout === 'Niet gevonden') throw new Error('De tijdmachine is er nog niet. Probeer het later nog eens.');
    if (!j || !j.ok) throw new Error((j && j.fout) || 'Dat lukte niet. Probeer het zo nog eens.');
    return j;
  }
  // gelijkzetten, ook als het blok net al bezig was
  async function tmSync(opties) { for (let i = 0; i < 20 && bezigK; i++) await new Promise(ok => setTimeout(ok, 400)); return koppelSync(true, opties); }
  async function tijdmachine(sleutel, spel) {
    const zet = html => { dlg.dataset.scherm = 'tijd'; dlg.innerHTML = '<div class="kp-in">' + html + '</div>'; const f = dlg.querySelector('.kp-keus, .kp-knop'); if (f) f.focus(); };
    const knoppen = (terug, extra) => `<div class="kp-rij">${extra || ''}<button class="kp-knop" type="button" data-tm-terug="${tmEsc(terug)}">Terug</button></div>`;
    const fout = (tekst, terug) => zet(`<h2>⏪ Tijdmachine</h2><p class="kp-fout" role="alert">${tmEsc(tekst)}</p>${knoppen(terug)}`);
    dlg.onclick = e => { const t = e.target.closest('[data-tm-terug]'); if (t) { if (t.dataset.tmTerug === 'account') { dlg.onclick = null; openKoppel(); } else tijdmachine(t.dataset.tmTerug === 'spellen' ? '' : t.dataset.tmTerug, spel); } };
    zet('<h2>⏪ Tijdmachine</h2><p class="kp-klein" role="status">Even kijken wat er bewaard is...</p>');
    if (!sleutel) {
      let j; try { await tmSync(); j = await tmVraag('/tijdmachine', {}); } catch (e) { return fout(e.message, 'account'); }
      const lijst = j.spellen || [];
      zet(`<h2>⏪ Tijdmachine</h2><p>Ging er iets mis? Van de laatste ${j.dagen || 30} dagen staan hier eerdere versies van je spellen. Kies een spel.</p>${lijst.length ? '<ul class="kp-lijst">' + lijst.map(s => `<li><button class="kp-keus" type="button" data-sleutel="${tmEsc(s.sleutel)}"><b>${tmEsc(s.naam)}</b><span>${s.n} ${s.n === 1 ? 'moment' : 'momenten'} · ${s.weg ? 'nu weggehaald' : 'laatst ' + tmDag(s.laatst).toLowerCase() + ' ' + tmUur(s.laatst)}</span></button></li>`).join('') + '</ul>' : '<p class="kp-klein">Er is nog niets bewaard. Speel eerst een tijdje: elke keer dat je spel verandert, onthoudt de tijdmachine hoe het daarvoor was.</p>'}${knoppen('account')}`);
      dlg.querySelectorAll('[data-sleutel]').forEach(b => { b.onclick = () => tijdmachine(b.dataset.sleutel, lijst.find(s => s.sleutel === b.dataset.sleutel)); });
      return;
    }
    let j; try { j = await tmVraag('/tijdmachine', { sleutel }); } catch (e) { return fout(e.message, 'spellen'); }
    const uitleg = j.precies ? 'Je gaat precies terug naar dat moment. Wat er nu staat, blijft in de tijdmachine, dus je kunt het ook weer terugzetten.' : 'Je krijgt terug wat je toen had. Wat je daarna haalde, blijft gewoon staan.';
    let dag = '', rijen = '';
    for (const m of j.momenten || []) { const d = tmDag(m.t); if (d !== dag) { dag = d; rijen += `<li class="kp-dag">${tmEsc(d.charAt(0).toUpperCase() + d.slice(1))}</li>`; } rijen += `<li><button class="kp-keus" type="button" data-moment="${tmEsc(m.id)}"><b>${tmUur(m.t)}${TM_SOORT[m.soort] ? ` <i class="kp-label">${TM_SOORT[m.soort]}</i>` : ''}</b><span>${tmEsc(m.wat || 'een eerdere versie')}</span></button></li>`; }
    zet(`<h2>⏪ ${tmEsc(j.naam)}</h2><p class="kp-klein"><b>Nu:</b> ${tmEsc(j.nu ? j.nu.wat || 'je huidige spel' : 'nog niets')}</p><p class="kp-klein">${uitleg}</p>${rijen ? '<ul class="kp-lijst">' + rijen + '</ul>' : '<p>Van dit spel is (nog) geen eerdere versie bewaard.</p>'}${knoppen('spellen')}`);
    dlg.querySelectorAll('[data-moment]').forEach(b => { b.onclick = () => {
      const m = j.momenten.find(x => x.id === b.dataset.moment);
      zet(`<h2>Terugzetten?</h2><p>${tmEsc(j.naam)} gaat terug naar <b>${tmEsc(tmDag(m.t).toLowerCase())} om ${tmUur(m.t)}</b>${m.wat ? ': ' + tmEsc(m.wat) : ''}.</p><p class="kp-klein">${uitleg} Je andere apparaten krijgen het ook.</p><p class="kp-fout" id="kp-fout" role="status"></p><div class="kp-rij"><button class="kp-knop kp-hoofd" type="button" id="kp-ja">Zet terug</button><button class="kp-knop" type="button" data-tm-terug="${tmEsc(sleutel)}">Annuleren</button></div>`);
      dlg.querySelector('#kp-ja').onclick = async () => {
        const q = id => dlg.querySelector('#' + id); q('kp-ja').disabled = true; q('kp-fout').textContent = 'Even bezig...';
        // eerst wat hier nog niet op de server stond (dat komt dan ook in de tijdmachine), dan terugzetten, dan het nieuwe moment ophalen
        let r; try { await tmSync(); r = await tmVraag('/tijdmachine/terug', { sleutel, moment: m.id }); } catch (e) { q('kp-fout').textContent = e.message; q('kp-ja').disabled = false; return; }
        const klaarTekst = r.al ? 'Alles van dat moment staat er al.' : '⏪ ' + j.naam + ' is teruggezet. Je andere apparaten krijgen het ook.';
        // het spel van deze pagina: herladen, zodat het spel de teruggezette stand leest (zie bovenaan dit blok)
        let weg = false; const hier = vanDezePagina(sleutel) && !r.al; addEventListener('pagehide', () => { weg = true; }, { once: true });
        if (hier) try { sessionStorage.setItem('koppel-terug', klaarTekst); } catch (e) {}
        await tmSync({ herlaad: hier });
        await new Promise(ok => setTimeout(ok, 1500)); if (weg) return;
        try { sessionStorage.removeItem('koppel-terug'); } catch (e) {}
        zet(`<h2>⏪ Tijdmachine</h2><p>${tmEsc(klaarTekst)}</p>${knoppen('spellen', '<button class="kp-knop kp-hoofd" type="button" id="kp-dicht2">Sluiten</button>')}`);
        dlg.querySelector('#kp-dicht2').onclick = () => dlg.close();
      };
    }; });
  }
  API.koppel = openKoppel; API.koppelSync = koppelSync; API.gebruikCode = gebruikCode; API.opnieuw = opnieuw; API.live = live; API.deurbel = () => LIVE.open();
  // ---------- betrouwbaarheid: hetzelfde spel maar in één tabblad tegelijk, anders overschrijven ze elkaars voortgang
  (function tabbladBewaker() {
    if (!('BroadcastChannel' in window)) return;
    const pagina = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
    const naam = pagina + (location.hash === '#wedstrijd' ? '-wedstrijd' : '');
    if (!SLEUTELS.some(k => k.startsWith(pagina.replace(/^rommel/, 'rommel')) || (pagina === 'vlaaienbakker' && k.startsWith('vlaaienbakker')))) return;
    const ik = Math.random().toString(36).slice(2), kanaal = new BroadcastChannel('rommelhoekje-tabbladen');
    const stopHier = () => { try { sessionStorage.setItem('ander-tabblad', '1'); } catch (e) {} location.replace('./'); };
    kanaal.onmessage = e => { const d = e.data || {}; if (d.pagina !== naam || d.van === ik) return;
      if (d.soort === 'hallo') kanaal.postMessage({ soort: 'ik-ben-hier', pagina: naam, van: ik });
      if (d.soort === 'ik-ben-hier' && !vraagOpen) vraag();
      if (d.soort === 'neem-over' && d.naar !== ik) stopHier(); };
    let vraagOpen = false;
    function vraag() { vraagOpen = true; const w = document.createElement('div'); w.setAttribute('role', 'alertdialog'); w.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,14,30,.75);display:grid;place-items:center;padding:1rem;font-family:system-ui,sans-serif';
      w.innerHTML = '<div style="background:#FBF6E9;color:#231A26;border-radius:14px;padding:1.2rem 1.3rem;max-width:26rem;box-shadow:0 10px 40px rgba(0,0,0,.4)"><h2 style="margin:0 0 .4rem">Dit spel staat al open</h2><p style="margin:0 0 .9rem;line-height:1.45">Je speelt dit spel al in een ander tabblad. Als je in twee tabbladen tegelijk speelt, overschrijven ze elkaars voortgang. Waar wil je verder spelen?</p><p style="display:flex;gap:.5rem;flex-wrap:wrap;margin:0"><button type="button" data-hier style="font:inherit;font-weight:800;border:0;border-radius:8px;padding:.6rem .9rem;background:#C8323C;color:#fff;cursor:pointer">Hier verder spelen</button><button type="button" data-daar style="font:inherit;font-weight:800;border:0;border-radius:8px;padding:.6rem .9rem;background:#E3D9CA;color:#231A26;cursor:pointer">In het andere tabblad</button></p></div>';
      document.body.appendChild(w);
      w.querySelector('[data-hier]').onclick = () => { kanaal.postMessage({ soort: 'neem-over', pagina: naam, van: ik, naar: ik }); w.remove(); vraagOpen = false; };
      w.querySelector('[data-daar]').onclick = stopHier; }
    kanaal.postMessage({ soort: 'hallo', pagina: naam, van: ik });
  })();
  try { if (sessionStorage.getItem('ander-apparaat')) { sessionStorage.removeItem('ander-apparaat'); addEventListener('load', () => setTimeout(() => toonKoppelMelding('Je speelt nu verder op je andere apparaat. Hier is het spel gestopt, zodat je voortgang niet wordt overschreven.', 'Oké', () => {}), 500)); } } catch (e) {}
  try { if (sessionStorage.getItem('ander-tabblad')) { sessionStorage.removeItem('ander-tabblad'); addEventListener('load', () => setTimeout(() => alert('Je speelt dit spel nu verder in een ander tabblad. Hier is het gestopt, zodat je voortgang niet wordt overschreven.'), 300)); } } catch (e) {}
  // ---------- betrouwbaarheid: een reservekopie van elke opslag; is een opslag kapot, dan komt de laatste goede terug
  (function reserve() {
    const RES = '~reserve';
    for (const k of SLEUTELS) { try { const v = localStorage.getItem(k); if (v === null) continue; try { JSON.parse(v); } catch (e) { const r = localStorage.getItem(k + RES); if (r) { localStorage.setItem(k, r); console.warn('Opslag hersteld uit de reservekopie:', k); } } } catch (e) {} }
    const maak = () => { let totaal = 0; try { for (let i = 0; i < localStorage.length; i++) totaal += (localStorage.getItem(localStorage.key(i)) || '').length; } catch (e) { return; } if (totaal > 3e6) return; for (const k of SLEUTELS) { try { const v = localStorage.getItem(k); if (!v || v.length > 250000) continue; JSON.parse(v); if (localStorage.getItem(k + RES) !== v) localStorage.setItem(k + RES, v); } catch (e) {} } };
    setTimeout(maak, 20000); setInterval(maak, 180000); addEventListener('pagehide', maak);
  })();
  // ---------- betrouwbaarheid: fouten in de browser gaan (anoniem, hooguit drie per bezoek) naar de server, zodat Ruben ze ziet
  (function foutmelder() {
    let n = 0; const gezien = new Set();
    const meld = (bericht, regel) => { bericht = String(bericht || '').slice(0, 200); if (!bericht || n >= 3 || gezien.has(bericht) || /ResizeObserver|Script error\.?$/.test(bericht)) return; gezien.add(bericht); n++; klaar.then(inst => { const u = adres(inst); if (!u) return; fetch(u + '/fout', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, keepalive: true, body: JSON.stringify({ pagina: location.pathname.split('/').pop() || 'index.html', bericht, regel }) }).catch(() => {}); }).catch(() => {}); };
    addEventListener('error', e => { if (e && e.message) meld(e.message, (e.lineno || '') + ':' + (e.colno || '')); });
    addEventListener('unhandledrejection', e => { const r = e && e.reason; if (r && r.name === 'AbortError') return; meld('Onafgehandeld: ' + ((r && r.message) || r), ''); });
  })();
  // offline: de service worker van de hele site (rommelhoekje-sw.js) en het manifest, zodat de site ook te installeren is
  try {
    if (typeof navigator !== 'undefined' && navigator.serviceWorker && (location.protocol === 'https:' || location.hostname === 'localhost') && !/\/werkplaats[^/]*$/.test(location.pathname)) {
      addEventListener('load', () => { navigator.serviceWorker.register('rommelhoekje-sw.js', { scope: './', updateViaCache: 'none' }).catch(() => {}); });
      const link = (rel, href) => { if (document.head && !document.querySelector('link[rel="' + rel + '"]')) { const l = document.createElement('link'); l.rel = rel; l.href = href; document.head.appendChild(l); } };
      link('manifest', 'rommelhoekje.webmanifest'); link('apple-touch-icon', 'rommelhoekje-icoon-180.png');
    }
  } catch (e) {}
  // iedereen heeft een account: zonder koppelcode maakt dit apparaat er zelf een, en bewaart de server de voortgang
  try { const m = /^#koppel=([A-Za-z0-9-]{8,9})$/.exec(location.hash), B = m ? schoonBewijs(m[1]) : ''; if (m) { history.replaceState(null, '', location.pathname + location.search); if (isBewijs(B)) { bewijsWacht = true; const toon = () => koppelVraag(B); if (document.readyState === 'loading') addEventListener('DOMContentLoaded', toon); else toon(); } } } catch (e) {}
  setTimeout(() => { const K = leesK(); if (!bewijsWacht && (!K || (!K.code && !K.uit))) maakKoppeling().catch(() => {}); }, 2500);
  // werd een opslag geweigerd (valsspelen)? Dan even uitleggen waarom de stand terug is gezet
  // teruggezet met de tijdmachine (op deze pagina): die melding gaat voor
  try { const t = sessionStorage.getItem('koppel-terug'); if (t) { for (const x of ['koppel-terug', 'koppel-opnieuw', 'koppel-samen', 'koppel-vervangen']) sessionStorage.removeItem(x); addEventListener('load', () => setTimeout(() => toonKoppelMelding(tmEsc(t)), 900)); } } catch (e) {}
  try { if (sessionStorage.getItem('koppel-vervangen')) { sessionStorage.removeItem('koppel-vervangen'); addEventListener('load', () => setTimeout(() => toonKoppelMelding('Je voortgang van je andere apparaat is opgehaald: daar was je verder.'), 900)); } } catch (e) {}
  try { if (sessionStorage.getItem('koppel-opnieuw')) { sessionStorage.removeItem('koppel-opnieuw'); addEventListener('load', () => setTimeout(() => toonKoppelMelding('Op een ander apparaat ben je hier opnieuw begonnen. Je vorige voortgang is bewaard.'), 900)); } } catch (e) {}
  try { if (sessionStorage.getItem('koppel-samen')) { sessionStorage.removeItem('koppel-samen'); addEventListener('load', () => setTimeout(() => toonKoppelMelding('Wat je op je andere apparaat deed, is erbij gezet.'), 900)); } } catch (e) {}
  try { const w = sessionStorage.getItem('koppel-geweigerd'); if (w) { sessionStorage.removeItem('koppel-geweigerd'); addEventListener('load', () => setTimeout(() => alert('Je voortgang ging sneller dan de server kon controleren (' + w + '), dus hij is teruggezet naar de laatste goedgekeurde stand.\n\nSpeel je hetzelfde spel in twee tabbladen of op twee apparaten tegelijk? Gebruik er dan één tegelijk, dan gebeurt dit niet meer. Klopt er iets niet, laat het Ruben weten via de ideeënbox.'), 400)); } } catch (e) {}
  // op de homepage en het scorebord een knopje
  if (['index', '', 'scorebord'].includes(pagina)) addEventListener('DOMContentLoaded', () => { stijl(); const b = document.createElement('button'); b.className = 'kp-knopje'; b.type = 'button'; b.textContent = (leesK() || {}).code ? 'Apparaten gekoppeld' : 'Koppel je apparaten'; b.onclick = () => { openKoppel(); }; document.body.appendChild(b); });
  try { const hb = sessionStorage.getItem('koppel-hulp'); if (hb) { sessionStorage.removeItem('koppel-hulp'); const lijst = JSON.parse(hb); addEventListener('load', () => setTimeout(() => { toonHulp(lijst); setTimeout(() => koppelSync(true), 1500); }, 500)); } } catch (e) {}
  try { if (sessionStorage.getItem('koppel-melding')) { sessionStorage.removeItem('koppel-melding'); addEventListener('DOMContentLoaded', () => toonKoppelMelding('Je voortgang van je andere apparaat is opgehaald.')); } } catch (e) {}
  klaar.then(() => setTimeout(() => koppelSync(false), 600));
  // kort na een verandering in een spel gelijkzetten (hooguit eens per 30 seconden), en anders elke minuut even kijken
  let laatsteSync = 0, gepland = null;
  const plan = ms => { if (gepland) return; gepland = setTimeout(() => { gepland = null; if (offline()) return naarWachtrij(); const nog = 30000 - (Date.now() - laatsteSync); if (nog > 0) return plan(nog); koppelSync(true); }, ms); };
  const isV3 = () => { try { const c = JSON.parse(localStorage.getItem(KV) || 'null'); return !!(c && c.v === 3); } catch (e) { return false; } };
  const naarWachtrij = () => { const K = leesK(); if (K && K.code && isV3()) klaar.then(inst => { const url = adres(inst); if (url) wachtrij(K, url); }); };
  addEventListener('online', () => setTimeout(() => koppelSync(true), 1200));
  try {
    const zet = Storage.prototype.setItem, haalWeg = Storage.prototype.removeItem, opslag = localStorage;
    Storage.prototype.setItem = function (k, v) { const r = zet.call(this, k, v); if (this === opslag && SLEUTELS.includes(k)) plan(5000); return r; };
    Storage.prototype.removeItem = function (k) { const r = haalWeg.call(this, k); if (this === opslag && SLEUTELS.includes(k)) plan(5000); return r; };
  } catch (e) {}
  setInterval(() => { if (!document.hidden && Date.now() - laatsteSync > (LIVE.open() ? 295000 : 55000)) koppelSync(true); }, 60000);
  // eerst het spel laten opslaan, dan pas meesturen
  document.addEventListener('visibilitychange', () => { if (document.hidden) setTimeout(() => koppelSync(true), 400); });
  // bij het sluiten: als allerlaatste (na de opslag van het spel) nog snel versturen wat veranderd is
  addEventListener('load', () => addEventListener('pagehide', () => {
    const K = leesK(); if (!K || !K.code) return;
    // het nieuwe koppelen: alleen het verschil
    if (isV3()) { klaar.then(inst => { const url = adres(inst); if (url) (offline() ? wachtrij : sluitSync3)(K, url); }); return; }
    if (K.v !== 2) return;
    // wat bij het herladen nog wordt neergezet, sturen we niet (dat is de versie die het niet wordt)
    let hs = {}; try { hs = JSON.parse(sessionStorage.getItem('koppel-herstel') || '{}') || {}; } catch (e) {}
    klaar.then(inst => { const url = (inst.scoreUrl || '').replace(/\/+$/, ''); if (!url) return; const items = {}; let grootte = 0;
      for (const k of SLEUTELS) { if (k in hs) continue; let v = null; try { v = localStorage.getItem(k); } catch (e) {} if (v === null) continue; const st = (K.staat || {})[k]; if (st && st.h === hash(v)) continue; if (grootte + v.length > 60000) continue; grootte += v.length; items[k] = { t: Date.now(), data: v, basis: st ? st.t || 0 : 0, basisH: st && st.h ? st.h : '' }; if (K.hulpUit && K.hulpUit[k]) items[k].hulp = K.hulpUit[k]; }
      if (!Object.keys(items).length) return;
      try { fetch(url + '/sync', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ v: 2, code: K.code, items, bekend: {}, apparaat: APPARAAT, alleenSturen: 1 }), keepalive: true }); } catch (e) {}
    });
  }));
  API.synchroniseer = synchroniseer;
  window.Scorebord = API;
  // bij elk bezoek, en als je even naar een ander tabblad gaat
  klaar.then(() => setTimeout(synchroniseer, 1500));
  document.addEventListener('visibilitychange', () => { if (document.hidden) synchroniseer(); });
})();

})();
;(function () {
(function () {
  // Elk stuk gereedschap hangt aan een haakje op punt (px, py) van zijn eigen tekening.
  const D = '#23252B';
  const TANDEN = 'M44 50' + 'l4 5l4-5'.repeat(15);
  const GEREEDSCHAP = {
    hamer: { w: 70, h: 152, px: 35, py: 6, svg: `<circle cx="35" cy="6" r="5" fill="none" stroke="#3A2A1E" stroke-width="2.5"/><path d="M35 11v4" stroke="#3A2A1E" stroke-width="2.5"/><rect x="29" y="14" width="12" height="108" rx="5" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><rect x="29" y="18" width="12" height="34" rx="4" fill="#2E2E33"/><path d="M31 24h8M31 30h8M31 36h8M31 42h8" stroke="#55555C" stroke-width="1.5"/><rect x="6" y="118" width="58" height="24" rx="3" fill="#8C939E" stroke="#5F6470" stroke-width="1.5"/><rect x="56" y="115" width="10" height="30" rx="2" fill="#6F7785" stroke="#4A4F59" stroke-width="1.5"/><path d="M6 121l-5-5M6 139l-5 5" stroke="#5F6470" stroke-width="4" stroke-linecap="round"/>` },
    schroevendraaier: { w: 34, h: 150, px: 17, py: 7, svg: `<rect x="7" y="0" width="20" height="56" rx="8" fill="#C8323C" stroke="#9E2430" stroke-width="1.5"/><circle cx="17" cy="7" r="3.4" fill="${D}"/><path d="M12 17v32M17 17v32M22 17v32" stroke="#9E2430" stroke-width="2" stroke-linecap="round"/><rect x="11" y="55" width="12" height="9" rx="2" fill="#C9CED6" stroke="#8C939E"/><rect x="15" y="64" width="4" height="76" fill="#A9AFB8"/><path d="M14.5 140h5l-1.5 9h-2z" fill="#8C939E"/>` },
    zaag: { w: 170, h: 70, px: 23, py: 24, svg: `<path d="M44 14L166 24V50H44z" fill="#C9CED6" stroke="#8C939E" stroke-width="1.5"/><path d="${TANDEN}" fill="none" stroke="#8C939E" stroke-width="1.5" stroke-linejoin="round"/><path d="M60 22l90 7" stroke="#E6EAEF" stroke-width="2"/><path d="M4 8h42v54H4q-4 0-4-4V12q0-4 4-4z" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><rect x="12" y="20" width="22" height="28" rx="7" fill="${D}"/><circle cx="40" cy="18" r="2" fill="#8C939E"/><circle cx="40" cy="52" r="2" fill="#8C939E"/>` },
    tang: { w: 60, h: 150, px: 30, py: 26, svg: `<path d="M15 4q-5 42 13 86" stroke="#2F7A6E" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M45 4q5 42-13 86" stroke="#C8323C" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M24 92l2 48 4 6 4-6 2-48z" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5" stroke-linejoin="round"/><path d="M30 100v40" stroke="#6F7785" stroke-width="1.2"/><circle cx="30" cy="92" r="7" fill="#8C939E" stroke="#5F6470" stroke-width="1.5"/><circle cx="30" cy="92" r="2.4" fill="#5F6470"/>` },
    steeksleutel: { w: 44, h: 168, px: 22, py: 9, svg: `<circle cx="22" cy="20" r="17" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><rect x="15" y="0" width="14" height="20" rx="2" fill="${D}"/><rect x="16" y="32" width="12" height="108" rx="4" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><path d="M19 46v80" stroke="#C9CED6" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="150" r="15" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><circle cx="22" cy="150" r="7" fill="${D}"/>` },
    duimstok: { w: 40, h: 166, px: 20, py: 10, svg: `<rect x="10" y="4" width="24" height="158" rx="2" fill="#E0AE1E" stroke="#B8901A" stroke-width="1.5"/><rect x="6" y="2" width="24" height="158" rx="2" fill="#F2C230" stroke="#B8901A" stroke-width="1.5"/><circle cx="20" cy="10" r="3" fill="${D}"/><path d="M6 24h7M6 34h5M6 44h7M6 54h5M6 64h7M6 74h5M6 84h7M6 94h5M6 104h7M6 114h5M6 124h7M6 134h5M6 144h7" stroke="#3A3D46" stroke-width="1.4"/><circle cx="18" cy="152" r="2.4" fill="#B8862F"/>` },
    schaar: { w: 62, h: 132, px: 20, py: 11, svg: `<path d="M26 28L37 124l5-2L31 28z" fill="#C9CED6" stroke="#8C939E" stroke-width="1.5" stroke-linejoin="round"/><path d="M36 28L25 124l-5-2L31 28z" fill="#DDE1E6" stroke="#8C939E" stroke-width="1.5" stroke-linejoin="round"/><circle cx="20" cy="18" r="10" fill="none" stroke="#2F4C8F" stroke-width="6"/><circle cx="42" cy="18" r="10" fill="none" stroke="#2F4C8F" stroke-width="6"/><circle cx="31" cy="48" r="3.2" fill="#6F7785"/>` },
    plakband: { w: 72, h: 72, px: 36, py: 24, svg: `<circle cx="36" cy="36" r="31" fill="#D9BE78" stroke="#B8862F" stroke-width="1.5"/><circle cx="36" cy="36" r="25" fill="none" stroke="#C9A85E" stroke-width="1"/><circle cx="36" cy="36" r="17" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><circle cx="36" cy="36" r="13" fill="${D}"/><path d="M66 40l3 18-12 2z" fill="#E4CC8E" stroke="#B8862F" stroke-width="1.2"/>` },
    kwast: { w: 40, h: 150, px: 20, py: 9, svg: `<rect x="13" y="0" width="14" height="82" rx="7" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><circle cx="20" cy="9" r="3.4" fill="${D}"/><rect x="8" y="78" width="24" height="20" rx="2" fill="#C9CED6" stroke="#8C939E" stroke-width="1.5"/><path d="M8 84h24M8 90h24" stroke="#A9AFB8"/><path d="M8 98h24l2 42q-14 7-28 0z" fill="#3A3D46"/><path d="M6 132q14 8 28 0l0 8q-14 7-28 0z" fill="#C8323C"/>` },
    waterpas: { w: 190, h: 40, px: 95, py: 11, svg: `<rect x="2" y="4" width="186" height="30" rx="4" fill="#E9B949" stroke="#B8862F" stroke-width="1.5"/><rect x="2" y="4" width="14" height="30" rx="3" fill="#3A3D46"/><rect x="174" y="4" width="14" height="30" rx="3" fill="#3A3D46"/><circle cx="95" cy="11" r="3.4" fill="${D}"/><rect x="118" y="12" width="40" height="14" rx="7" fill="#CDEFE0" stroke="#5E7F8C" stroke-width="1.5"/><path d="M131 12v14M145 12v14" stroke="#5E7F8C" stroke-width="1"/><circle class="bel" cx="138" cy="19" r="4.5" fill="#fff" stroke="#9FD3C7"/><rect x="40" y="14" width="34" height="10" rx="5" fill="#CDEFE0" stroke="#5E7F8C" stroke-width="1.2"/>` },
    boor: { w: 132, h: 110, px: 50, py: 8, svg: `<circle cx="50" cy="8" r="5" fill="none" stroke="#3A2A1E" stroke-width="2.5"/><path d="M50 13v2" stroke="#3A2A1E" stroke-width="2.5"/><rect x="18" y="14" width="80" height="34" rx="11" fill="#2E8B62" stroke="#1E5E42" stroke-width="1.5"/><rect x="20" y="16" width="30" height="30" rx="9" fill="#23252B"/><path d="M26 24h18M26 30h18M26 36h18" stroke="#45495A" stroke-width="1.6"/><rect x="96" y="20" width="14" height="22" rx="3" fill="#3A3D46" stroke="#23252B" stroke-width="1.5"/><path d="M99 22v18M103 22v18" stroke="#5F6470"/><rect x="110" y="27" width="20" height="8" rx="2" fill="#A9AFB8" stroke="#6F7785"/><path d="M112 31h16" stroke="#6F7785" stroke-dasharray="2 2"/><path d="M44 46h24l-5 46H48z" fill="#23252B" stroke="#1F2333" stroke-width="1.5" stroke-linejoin="round"/><rect x="62" y="50" width="8" height="13" rx="2" fill="#E9B949"/><rect x="30" y="90" width="52" height="18" rx="4" fill="#2E8B62" stroke="#1E5E42" stroke-width="1.5"/><rect x="36" y="95" width="12" height="4" rx="1" fill="#CDEFE0"/><rect x="51" y="95" width="5" height="4" rx="1" fill="#CDEFE0"/>` },
    verfroller: { w: 84, h: 130, px: 40, py: 7, svg: `<rect x="33" y="0" width="14" height="70" rx="7" fill="#C8323C" stroke="#9E2430" stroke-width="1.5"/><circle cx="40" cy="7" r="3.4" fill="${D}"/><path d="M36 18v44M44 18v44" stroke="#9E2430" stroke-width="1.5"/><path d="M40 70v8q0 6 6 6h22q6 0 6 6v12" fill="none" stroke="#A9AFB8" stroke-width="4" stroke-linecap="round"/><rect x="6" y="100" width="72" height="27" rx="11" fill="#FBF6E9" stroke="#C9B58A" stroke-width="1.5"/><path d="M12 107q30 4 60 0M12 114q30 4 60 0M12 121q30 4 60 0" stroke="#E9DFC4" stroke-width="1.5" fill="none"/><path d="M8 118q14 8 26-1q10 6 18 1" stroke="#2F4C8F" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>` },
    klem: { w: 70, h: 148, px: 14, py: 7, svg: `<rect x="9" y="0" width="10" height="146" rx="2" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><circle cx="14" cy="7" r="3" fill="${D}"/><path d="M12 30v112" stroke="#C9CED6" stroke-width="1.5"/><path d="M14 16h44v14H14z" fill="#3A3D46" stroke="#23252B" stroke-width="1.5" stroke-linejoin="round"/><rect x="47" y="30" width="12" height="6" rx="1" fill="#C8323C"/><path d="M14 96h44v14H14z" fill="#3A3D46" stroke="#23252B" stroke-width="1.5" stroke-linejoin="round"/><rect x="49" y="58" width="8" height="38" fill="#C9CED6" stroke="#8C939E"/><path d="M49 64h8M49 70h8M49 76h8M49 82h8M49 88h8" stroke="#8C939E"/><rect x="46" y="52" width="14" height="6" rx="1" fill="#C8323C"/><rect x="44" y="110" width="18" height="34" rx="7" fill="#C8323C" stroke="#9E2430" stroke-width="1.5"/>` },
    beitel: { w: 30, h: 150, px: 15, py: 8, svg: `<rect x="7" y="0" width="16" height="64" rx="7" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><circle cx="15" cy="8" r="3.4" fill="${D}"/><path d="M11 20v36M19 20v36" stroke="#9A6438" stroke-width="1.2"/><rect x="6" y="58" width="18" height="8" rx="2" fill="#C9A85E" stroke="#8C6A2A"/><path d="M11 66h8v66l3 14H8l3-14z" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 72v58" stroke="#DDE1E6" stroke-width="1.5"/>` },
    rolmaat: { w: 84, h: 80, px: 38, py: 8, svg: `<rect x="30" y="2" width="16" height="16" rx="2" fill="#3A3D46"/><circle cx="38" cy="8" r="3" fill="${D}"/><rect x="4" y="14" width="68" height="62" rx="14" fill="#E9B949" stroke="#B8862F" stroke-width="1.5"/><circle cx="38" cy="45" r="18" fill="#23252B"/><circle cx="38" cy="45" r="11" fill="#3A3D46"/><circle cx="38" cy="45" r="3" fill="#E9B949"/><rect x="64" y="61" width="16" height="10" rx="1" fill="#F2DDA0" stroke="#B8862F"/><path d="M67 61v10M71 61v4M75 61v10" stroke="#3A3D46"/><rect x="78" y="58" width="4" height="16" fill="#8C939E"/><rect x="10" y="20" width="22" height="8" rx="3" fill="#F6D27A" opacity=".7"/>` },
    ijzerzaag: { w: 170, h: 66, px: 92, py: 8, svg: `<circle cx="92" cy="8" r="5" fill="none" stroke="#3A2A1E" stroke-width="2.5"/><path d="M92 13v3" stroke="#3A2A1E" stroke-width="2.5"/><path d="M34 46V18h124v28" fill="none" stroke="#2F4C8F" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/><rect x="34" y="42" width="124" height="6" fill="#C9CED6" stroke="#8C939E"/><path d="M36 48l3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4" fill="none" stroke="#8C939E" stroke-width="1.2"/><circle cx="158" cy="45" r="3" fill="#E9B949" stroke="#8C6A2A"/><path d="M8 32h28v28H16q-8 0-8-8z" fill="#C8323C" stroke="#9E2430" stroke-width="1.5" stroke-linejoin="round"/><rect x="14" y="40" width="14" height="12" rx="5" fill="${D}"/>` },
  };

  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = +(document.body.dataset.gat || 30), OFF = G / 2;
  const PAGINA = document.body.dataset.pagina || location.pathname;
  const KEY = 'gereedschap-v2';
  // dingen waar gereedschap nooit overheen mag hangen
  const HINDER = '.teaser-houder, .teaser, .nieuwtje, .doos, .sticker, .coulissen, .prop, .kaartje, .coulissen h2, h1, h2, h3, .briefje, .haak-rij .label, footer > *, .kop a, .paneel, .status, .plank, .tafel .som, .tafel .handnaam, .veld .kaart, .werkbank, .knoppen, .bericht, .klein, .uitleg, .bord, .legenda, .toetsen, .teller, .buffs .buff, .vlaai-knop, .melding:not([hidden]), .welkom, .dag, #uitslag > *, .opslaan-balk, main a, main button, .wrap > p';
  let opgeslagen = {};
  try { opgeslagen = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { opgeslagen = {}; }
  const bewaar = () => { try { localStorage.setItem(KEY, JSON.stringify(opgeslagen)); } catch (e) {} };

  const laag = document.createElement('div');
  laag.className = 'muurlaag'; laag.setAttribute('aria-hidden', 'true');
  laag.style.cssText = 'position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:3;';
  document.body.prepend(laag);
  const stijl = document.createElement('style');
  stijl.textContent = '.gs-sleept, .gs-sleept * { -webkit-user-select: none !important; user-select: none !important; cursor: grabbing !important; }';
  document.head.appendChild(stijl);

  const stukken = [];
  const actief = new Set();
  let laatste = 0, loopt = false;
  const snap = v => Math.round((v - OFF) / G) * G + OFF;
  const GRAAD = 180 / Math.PI;
  const breedte = () => document.documentElement.clientWidth;
  const hoogte = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  function hindernissen() {
    const sx = window.scrollX, sy = window.scrollY, uit = [];
    document.querySelectorAll(HINDER).forEach(el => {
      if (laag.contains(el)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      uit.push({ l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy });
    });
    return uit;
  }
  function kader(T, px, py) { return { l: px - T.px, t: py - T.py, r: px - T.px + T.w, b: py - T.py + T.h }; }
  function botst(k, lijst, marge) { return lijst.some(h => k.l < h.r + marge && k.r > h.l - marge && k.t < h.b + marge && k.b > h.t - marge); }
  function past(T, px, py, lijst, zelf) {
    const k = kader(T, px, py);
    if (k.l < 2 || k.r > breedte() - 2 || k.t < 2) return false;
    if (botst(k, lijst, 8)) return false;
    return !stukken.some(s => s !== zelf && botst(k, [kader(s.T, s.px, s.py)], 4));
  }
  // zoek het dichtstbijzijnde vrije gaatje rond (x, y)
  function vrijGaatje(T, x, y, zelf, lijst) {
    x = snap(x); y = snap(y);
    if (past(T, x, y, lijst, zelf)) return [x, y];
    for (let ring = 1; ring <= 14; ring++) {
      let beste = null, bd = Infinity;
      for (let dx = -ring; dx <= ring; dx++) for (let dy = -ring; dy <= ring; dy++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue;
        const cx = x + dx * G, cy = y + dy * G, d = dx * dx + dy * dy;
        if (d < bd && past(T, cx, cy, lijst, zelf)) { beste = [cx, cy]; bd = d; }
      }
      if (beste) return beste;
    }
    return null;
  }

  function bouw() {
    laag.innerHTML = ''; stukken.length = 0; actief.clear();
    laag.style.height = hoogte() + 'px';
    const lijst = hindernissen(), W = breedte(), midden = W / 2;
    const bewaard = opgeslagen[PAGINA] || {};
    const orde = z => (z.classList.contains('verspreid') ? 2 : z.classList.contains('zijkant') ? 1 : 0);
    const zones = Array.from(document.querySelectorAll('.rek[data-gereedschap]')).sort((p, q) => orde(p) - orde(q));
    zones.forEach(zone => {
      const r = zone.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) return;
      const bx = r.left + window.scrollX, by = r.top + window.scrollY;
      const ids = (zone.dataset.gereedschap || '').split(',').map(s => s.trim()).filter(id => GEREEDSCHAP[id]);
      if (zone.classList.contains('verspreid')) {
        // los over de hele pagina: zoek per stuk een vrij plekje, zo ver mogelijk van de rest
        for (const id of ids) {
          if (stukken.some(s => s.id === id)) continue;
          const T = GEREEDSCHAP[id], b = bewaard[id];
          let plek = null;
          if (b) { const px = snap(midden + b[0]), py = snap(b[1]); if (past(T, px, py, lijst, null)) plek = [px, py]; }
          if (!plek) {
            let zaad = [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 2147483647, 7) || 7, beste = -1;
            const rnd = () => (zaad = (zaad * 16807) % 2147483647) / 2147483647;
            for (let k = 0; k < 140; k++) {
              const px = snap(bx + 16 + rnd() * Math.max(0, r.width - 32 - T.w) + T.px), py = snap(by + 16 + rnd() * Math.max(0, r.height - 32 - T.h) + T.py);
              if (!past(T, px, py, lijst, null)) continue;
              const afstand = stukken.length ? Math.min(...stukken.map(s => Math.hypot(s.px - px, (s.py - py) * 1.3))) : 1e6;
              if (afstand > beste) { beste = afstand; plek = [px, py]; }
            }
            if (!plek || beste < 90) continue;
          }
          maakStuk(id, T, plek[0], plek[1]);
        }
        return;
      }
      let x = 12, y = 14, rij = 0;
      for (const id of ids) {
        if (stukken.some(s => s.id === id)) continue;
        const T = GEREEDSCHAP[id];
        let plek = null;
        const b = bewaard[id];
        if (b) { const px = snap(midden + b[0]), py = snap(b[1]); if (past(T, px, py, lijst, null)) plek = [px, py]; }
        if (!plek) {
          if (x + T.w > r.width - 8) { x = 12; y += rij + 34; rij = 0; }
          if (y + T.h > r.height) continue;
          const px = snap(bx + x + T.px), py = snap(by + y + T.py);
          x += T.w + 26; rij = Math.max(rij, T.h);
          plek = past(T, px, py, lijst, null) ? [px, py] : vrijGaatje(T, px, py, null, lijst);
          if (!plek) continue;
        }
        maakStuk(id, T, plek[0], plek[1]);
      }
    });
    if (!begroet && !reduce && stukken.length && window.name !== 'voorbeeld') { begroet = true; stukken.forEach((s, i) => setTimeout(() => duw(s, (i % 2 ? 1 : -1) * (14 + Math.random() * 14)), 300 + i * 110)); }
  }
  let begroet = false;

  function maakStuk(id, T, px, py) {
    const haak = document.createElement('span'); haak.className = 'gs-haak';
    const el = document.createElement('div'); el.className = 'gs gs-' + id;
    el.style.width = T.w + 'px'; el.style.height = T.h + 'px';
    el.style.transformOrigin = T.px + 'px ' + T.py + 'px';
    el.innerHTML = `<svg viewBox="0 0 ${T.w} ${T.h}" width="${T.w}" height="${T.h}" aria-hidden="true" focusable="false">${T.svg}</svg>`;
    laag.appendChild(el); laag.appendChild(haak);
    const s = { id, T, el, haak, px, py, a: 0, v: 0, sleep: false, bel: el.querySelector('.bel'), vorig: [px, py] };
    zet(s); stukken.push(s);

    el.addEventListener('pointerenter', e => {
      if (e.pointerType !== 'mouse' || s.sleep || reduce) return;
      const nu = performance.now();
      if (nu - (s.laatsteDuw || 0) < 150 || Math.abs(s.v) > 300) return;
      s.laatsteDuw = nu;
      const mx = e.movementX || (e.clientX - pivotScherm(s).x) / 4;
      duw(s, (mx > 0 ? -1 : 1) * (14 + Math.min(1, Math.abs(mx) / 25) * 30));
    });
    el.addEventListener('mousedown', e => e.preventDefault());
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      const p = pivotScherm(s);
      s.start = { x: e.clientX, y: e.clientY, dx: e.clientX - p.x, dy: e.clientY - p.y, t: e.pointerType };
      s.bewogen = false;
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') { el.setPointerCapture(e.pointerId); e.preventDefault(); }
    });
    el.addEventListener('pointermove', e => {
      if (!s.start || s.start.t === 'touch') return;
      if (!s.bewogen && Math.hypot(e.clientX - s.start.x, e.clientY - s.start.y) < 5) return;
      if (!s.bewogen) { s.bewogen = true; s.sleep = true; s.vorig = [s.px, s.py]; el.classList.add('sleept'); haak.style.opacity = '0'; document.documentElement.classList.add('gs-sleept'); const sel = window.getSelection && window.getSelection(); if (sel) sel.removeAllRanges(); }
      const W = breedte(), H = hoogte();
      const nx = Math.min(W - (T.w - T.px), Math.max(T.px, e.clientX + window.scrollX - s.start.dx));
      const ny = Math.min(H - (T.h - T.py), Math.max(T.py, e.clientY + window.scrollY - s.start.dy));
      if (!reduce) s.v += (nx - s.px) * 7 * Math.cos(s.a / GRAAD) - (ny - s.py) * 7 * Math.sin(s.a / GRAAD);
      s.px = nx; s.py = ny; zet(s); start(s);
    });
    const los = e => {
      if (!s.start) return;
      if (!s.bewogen) {
        s.laatsteDuw = performance.now();
        // zwaait hij al, dan geeft een klik extra vaart in dezelfde richting, zoals een schommel aanduwen
        const richting = Math.abs(s.v) > 30 ? Math.sign(s.v) : (e.clientX > pivotScherm(s).x ? 1 : -1);
        duw(s, richting * (Math.abs(s.v) > 30 ? 320 : 160));
      } else {
        const lijst = hindernissen();
        const plek = vrijGaatje(T, s.px, s.py, s, lijst) || s.vorig;
        s.px = plek[0]; s.py = plek[1];
        s.sleep = false; el.classList.remove('sleept'); haak.style.opacity = ''; document.documentElement.classList.remove('gs-sleept');
        zet(s); start(s);
        opgeslagen[PAGINA] = opgeslagen[PAGINA] || {};
        opgeslagen[PAGINA][id] = [Math.round(s.px - breedte() / 2), Math.round(s.py)];
        bewaar();
      }
      s.start = null;
    };
    el.addEventListener('pointerup', los);
    el.addEventListener('pointercancel', () => { s.start = null; document.documentElement.classList.remove('gs-sleept'); if (s.sleep) { s.sleep = false; el.classList.remove('sleept'); haak.style.opacity = ''; s.px = s.vorig[0]; s.py = s.vorig[1]; zet(s); } });
  }

  function pivotScherm(s) { return { x: s.px - window.scrollX, y: s.py - window.scrollY }; }
  function zet(s) {
    s.el.style.left = (s.px - s.T.px) + 'px';
    s.el.style.top = (s.py - s.T.py) + 'px';
    s.el.style.transform = 'rotate(' + s.a.toFixed(2) + 'deg)';
    s.haak.style.left = s.px + 'px'; s.haak.style.top = s.py + 'px';
    if (s.bel) s.bel.setAttribute('cx', (138 - Math.max(-13, Math.min(13, s.a * 1.6))).toFixed(1));
  }
  function duw(s, v) { if (reduce) return; s.v = Math.max(-2400, Math.min(2400, s.v + v)); start(s); }
  function start(s) { actief.add(s); if (!loopt) { loopt = true; laatste = performance.now(); requestAnimationFrame(tik); } }
  function tik(t) {
    const dt = Math.min(0.04, (t - laatste) / 1000); laatste = t;
    for (const s of actief) {
      if (!reduce) {
        // slinger: zwaartekracht trekt naar beneden, demping laat hem rustig uitzwaaien
        const stappen = 4, h = dt / stappen;
        for (let i = 0; i < stappen; i++) { s.v += (-38 * GRAAD * Math.sin(s.a / GRAAD) - 1.3 * s.v) * h; s.a += s.v * h; }
        s.a = ((s.a + 180) % 360 + 360) % 360 - 180;   // na een rondje over de kop weer netjes tussen -180 en 180
      }
      zet(s);
      if (!s.sleep && Math.abs(s.a) < 0.05 && Math.abs(s.v) < 0.08) { s.a = 0; s.v = 0; zet(s); actief.delete(s); }
    }
    if (actief.size) requestAnimationFrame(tik); else loopt = false;
  }
  // als de pagina verandert (bijvoorbeeld een nieuw paneel), schuift gereedschap opzij
  function ruimOp() {
    laag.style.height = hoogte() + 'px';
    const lijst = hindernissen();
    for (const s of stukken) {
      if (s.sleep) continue;
      if (!botst(kader(s.T, s.px, s.py), lijst, 4)) continue;
      const plek = vrijGaatje(s.T, s.px, s.py, s, lijst);
      if (plek) { s.px = plek[0]; s.py = plek[1]; zet(s); duw(s, 40); }
      else { s.el.style.display = 'none'; s.haak.style.display = 'none'; }
    }
  }
  setInterval(ruimOp, 1500);

  let wachtR = null, oudeB = breedte();
  window.addEventListener('resize', () => { if (breedte() === oudeB) return; oudeB = breedte(); clearTimeout(wachtR); wachtR = setTimeout(bouw, 200); });
  window.gereedschapBouw = () => bouw();
  window.gereedschapTerug = () => { delete opgeslagen[PAGINA]; bewaar(); bouw(); stukken.forEach(s => duw(s, (Math.random() - .5) * 60)); };
  bouw();
  window.addEventListener('load', bouw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(bouw);
})();

})();
;(function () {
(function () {
  // Veerkrachtige hover-animaties. Elke keer dat je muis een element raakt, krijgt het
  // meteen een zetje. Een veer brengt het daarna altijd rustig terug naar zijn plek.
  // Er wordt nooit een animatie opnieuw gestart, dus het blijft vloeiend, ook als je
  // snel heen en weer gaat of op het randje blijft hangen.
  const SOORTEN = [
    // [selector, soort]
    ['.stempel', 'stempel'],
    ['.label', 'zwaai'],
    ['.briefje', 'zwaai'],
    ['.tape', 'wiebel'],
    ['.sticker', 'wiebel'],
    ['.prop', 'zwaai'],
    ['.kaartje', 'zwaai'],
    ['h2 > span', 'wiebel'],
    ['.versie', 'wiebel'],
    ['.legenda li', 'hop'],
    ['.dag b', 'hop'],
  ];
  // veren per soort: k = stijfheid, d = demping, max = grootste uitslag
  const VEER = {
    wiebel: { a: { k: 90, d: 7, max: 4, duw: 70 }, y: { k: 160, d: 13, max: 5, duw: 90 } },
    zwaai: { a: { k: 26, d: 2.4, max: 5, duw: 34 } },
    hop: { a: { k: 120, d: 9, max: 5, duw: 60 }, y: { k: 170, d: 12, max: 6, duw: 120 } },
    stempel: { a: { k: 130, d: 9, max: 9, duw: 120 }, s: { k: 220, d: 14, max: 0.16, duw: 3 } },
    icoon: { a: { k: 110, d: 8, max: 7, duw: 80 }, y: { k: 150, d: 11, max: 7, duw: 130 } },
  };
  const KIES = SOORTEN.map(s => s[0]).join(', ');
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const staat = new WeakMap();
  const actief = new Set();
  let loopt = false, laatste = 0;

  function soortVan(el) { for (const [sel, s] of SOORTEN) if (el.matches(sel)) return s; return null; }
  function st(el, soort) {
    let s = staat.get(el);
    if (!s) { s = { el, soort, a: 0, va: 0, y: 0, vy: 0, s: 0, vs: 0, rust: 0 }; staat.set(el, s); }
    return s;
  }
  function zet(s) {
    if (Math.abs(s.a) < 0.01 && Math.abs(s.y) < 0.01 && Math.abs(s.s) < 0.0005) { s.el.style.transform = ''; return; }
    s.el.style.transform = `translateY(${s.y.toFixed(2)}px) rotate(calc(var(--r, 0deg) + ${s.a.toFixed(3)}deg)) scale(${(1 + s.s).toFixed(4)})`;
  }
  function duw(el, soort, richting, kracht) {
    const s = st(el, soort), V = VEER[soort];
    kracht = kracht == null ? 1 : kracht;
    if (V.a) s.va += richting * V.a.duw * kracht;
    if (V.y) s.vy -= V.y.duw * kracht;
    if (V.s) s.vs += V.s.duw * kracht;
    actief.add(s);
    if (!loopt) { loopt = true; laatste = performance.now(); requestAnimationFrame(tik); }
  }
  const klem = (v, m) => Math.max(-m, Math.min(m, v));
  function stap(x, v, V, dt) { v += (-V.k * x - V.d * v) * dt; x += v * dt; if (Math.abs(x) > V.max) { x = klem(x, V.max); v *= 0.5; } return [x, v]; }
  function tik(t) {
    const dt = Math.min(0.033, (t - laatste) / 1000); laatste = t;
    for (const s of actief) {
      const V = VEER[s.soort];
      if (V.a) [s.a, s.va] = stap(s.a, s.va, V.a, dt);
      if (V.y) [s.y, s.vy] = stap(s.y, s.vy, V.y, dt);
      if (V.s) [s.s, s.vs] = stap(s.s, s.vs, V.s, dt);
      zet(s);
      if (Math.abs(s.a) + Math.abs(s.va) / 20 < 0.02 && Math.abs(s.y) + Math.abs(s.vy) / 20 < 0.02 && Math.abs(s.s) + Math.abs(s.vs) / 20 < 0.0008) {
        s.a = s.va = s.y = s.vy = s.s = s.vs = 0; zet(s); actief.delete(s);
      }
    }
    if (actief.size) requestAnimationFrame(tik); else loopt = false;
  }

  document.addEventListener('pointerover', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const el = e.target.closest && e.target.closest(KIES);
    if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
    const soort = soortVan(el); if (!soort) return;
    const s = st(el, soort), nu = performance.now();
    if (nu - s.rust < 120) return;   // tegen haperen op het randje
    s.rust = nu;
    const mx = e.movementX || 0;
    const kracht = 0.55 + Math.min(1, Math.abs(mx) / 30) * 0.65;   // snel langs = iets meer zwaai
    duw(el, soort, mx >= 0 ? -1 : 1, kracht);
    if (soort === 'zwaai') { const ic = el.querySelector('.label-icoon svg'); if (ic) duw(ic, 'icoon', mx >= 0 ? 1 : -1, kracht); }
  });

  // binnenkomst: labels zwaaien even als de pagina opent
  if (window.name !== 'voorbeeld') document.querySelectorAll('.label').forEach((l, i) => setTimeout(() => duw(l, 'zwaai', i % 2 ? 1 : -1, 1.6), 250 + i * 160));
})();

})();
;(function () {
(function () {
  // HEBBEDINGEN: de sticker rechtsboven en de props uit Rubens musicals op de homepage.
  // Dit script bouwt alles zelf op, zodat de werkplaats het kan bijwerken zonder je labels aan te raken.
  if (document.querySelector('.coulissen')) return;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = '#1E3263';

  // ---------- geluid (alleen na een klik)
  let audio = null;
  function toon(f, start, duur, type, vol, naar) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), v = audio.createGain(), t = audio.currentTime + (start || 0);
      o.type = type || 'square'; o.frequency.setValueAtTime(f, t);
      if (naar) o.frequency.exponentialRampToValueAtTime(naar, t + duur);
      v.gain.setValueAtTime(vol || 0.04, t); v.gain.exponentialRampToValueAtTime(0.0001, t + duur);
      o.connect(v); v.connect(audio.destination); o.start(t); o.stop(t + duur + 0.03);
    } catch (e) {}
  }

  // ---------- props van Rubens personages (eigen tekeningen, geïnspireerd op zijn kostuums)
  const PEG = '<circle cx="0" cy="0" r="5" fill="#1E3263"/><path d="M0 0v10" stroke="#8C939E" stroke-width="3" stroke-linecap="round"/>';
  const SVG = {
    jas: `<svg viewBox="0 0 132 206" aria-hidden="true" focusable="false"><g transform="translate(66 8)">${PEG}</g>
      <path d="M66 16q0-8 8-8t6 8q-2 6-10 12" fill="none" stroke="#C9CED6" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M66 28L14 52q-6 3 0 6h104q6-3 0-6z" fill="#8C5530" stroke="#3A2414" stroke-width="2.5" stroke-linejoin="round"/>
      <g class="jas-lijf">
        <path d="M30 56q-14 6-18 26l-6 74q0 6 6 6h14l4-70" fill="#26262E" stroke="#0A0A0E" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M102 56q14 6 18 26l6 74q0 6-6 6h-14l-4-70" fill="#26262E" stroke="#0A0A0E" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M30 56q16-6 36-6t36 6l4 128q0 8-8 10l-32 6-32-6q-8-2-8-10z" fill="#2E2E38" stroke="#0A0A0E" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M30 70q4 40 2 112M102 70q-4 40-2 112" stroke="#3E3E4A" stroke-width="2" fill="none" opacity=".7"/>
        <path d="M54 52l12 34 12-34q-6 6-12 6t-12-6z" fill="#F2EDE2" stroke="#8C826C" stroke-width="1.6"/>
        <path d="M58 50q8 10 16 0" fill="none" stroke="#8C826C" stroke-width="1.4"/>
        <path d="M54 52q-12 4-14 24l14 26 12-20zM78 52q12 4 14 24l-14 26-12-20z" fill="#383844" stroke="#0A0A0E" stroke-width="2" stroke-linejoin="round"/>
        <path d="M60 46q6 8 12 0l2 8q-8 6-16 0z" fill="#26262E" stroke="#0A0A0E" stroke-width="2"/>
        ${[96, 116, 136, 156].map(y => `<circle cx="56" cy="${y}" r="3.4" fill="#C9CED6" stroke="#5F6470" stroke-width="1.2"/><circle cx="76" cy="${y}" r="3.4" fill="#C9CED6" stroke="#5F6470" stroke-width="1.2"/>`).join('')}
        <path d="M32 60L104 150l-2 20L28 82z" fill="#B82E3A" stroke="#4A0A12" stroke-width="2" stroke-linejoin="round"/>
        <path d="M34 70l68 86M31 77l69 87" stroke="#E0505C" stroke-width="1.6" opacity=".7"/>
        <path d="M96 150q10 10 6 30l-8-4q4-12-4-20zM104 156q12 6 12 26l-8-2q0-12-8-18z" fill="#9E2430" stroke="#4A0A12" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M44 190l22 4 22-4" fill="none" stroke="#0A0A0E" stroke-width="2"/>
        <g class="das"><g transform="rotate(-22 64 56)"><path d="M61 52q2 6 1 12M69 52q-1 6 0 12" stroke="#6E1F2A" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M58 64q6 5 12 0l2 7q-7 6-15 1z" fill="#6E1F2A" stroke="#2A0A10" stroke-width="1.6"/><path d="M61 71q-5 12 0 26l5 7 4-9q-1-15-4-24z" fill="#8E2F3A" stroke="#2A0A10" stroke-width="1.6" stroke-linejoin="round"/><path d="M63 77q0 10 3 19" stroke="#B85A64" stroke-width="1.2" fill="none"/><path d="M70 70q8 6 6 16" stroke="#8E2F3A" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>
        <g class="broche" transform="translate(88 98)">
          <path d="M0-14v28M-9-5h18" stroke="#DDE3EA" stroke-width="4.2" stroke-linecap="round"/>
          <path d="M0-14v28M-9-5h18" stroke="#8C939E" stroke-width="1.4" stroke-linecap="round"/>
          <circle cy="-14" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cy="14" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cx="-9" cy="-5" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cx="9" cy="-5" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cy="-5" r="3.2" fill="#2E8B62" stroke="#DDE3EA" stroke-width="1.2"/>
          <path class="glinster" d="M7-15l1.4 3.6L12-10l-3.6 1.4L7-5l-1.4-3.6L2-10l3.6-1.4z" fill="#fff" opacity="0"/>
        </g>
      </g>
    </svg>`,
    kroon: `<svg viewBox="0 0 150 128" aria-hidden="true" focusable="false"><g transform="translate(75 8)">${PEG}</g>
      <g class="gloed" opacity="0"><ellipse cx="75" cy="78" rx="70" ry="44" fill="#4BE38A" opacity=".25"/></g>
      <g stroke="#3E3112" stroke-width="1.6" stroke-linejoin="round">
        <path d="M20 86L14 40l18 30 6-52 14 46 10-50 13 44 13-44 10 50 14-46 6 52 18-30-6 46z" fill="#6B5A2A"/>
        <path d="M24 88L22 54l14 24 8-40 12 38 10-42 9 40 9-40 10 42 12-38 8 40 14-24-2 34z" fill="#C9A24A"/>
        <path d="M44 38l4 34M66 30l3 40M84 30l-3 40M106 38l-4 34" stroke="#F2D58A" stroke-width="1.4" fill="none"/>
        <rect x="18" y="84" width="114" height="22" rx="4" fill="#A88536"/>
        <path d="M18 95h114" stroke="#6B5A2A" stroke-width="2"/>
      </g>
      <g fill="#E9C46A"><circle cx="34" cy="90" r="2.4"/><circle cx="54" cy="90" r="2.4"/><circle cx="96" cy="90" r="2.4"/><circle cx="116" cy="90" r="2.4"/><circle cx="34" cy="101" r="2.4"/><circle cx="116" cy="101" r="2.4"/></g>
      <path class="steen" d="M75 82l9 12-9 12-9-12z" fill="#2E8B62" stroke="#1E5E42" stroke-width="1.6"/>
      <path d="M72 88l3-3 3 3" stroke="#B8F0CF" stroke-width="1.5" fill="none"/>
    </svg>`,
    stok: `<svg viewBox="0 0 70 236" aria-hidden="true" focusable="false"><g transform="translate(30 8)">${PEG}</g>
      <path d="M30 14q-20 0-20 18" fill="none" stroke="#C99A2E" stroke-width="9" stroke-linecap="round"/>
      <path d="M30 14q-20 0-20 18" fill="none" stroke="#F2D58A" stroke-width="3" stroke-linecap="round"/>
      <path d="M30 14q18 0 18 18v16" fill="none" stroke="#C99A2E" stroke-width="11" stroke-linecap="round"/>
      <path d="M30 14q18 0 18 18v16" fill="none" stroke="#F2D58A" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="10" cy="34" r="6" fill="#E9C46A" stroke="#8C6A2A" stroke-width="1.5"/>
      <rect x="42" y="46" width="12" height="12" rx="2" fill="#C99A2E" stroke="#8C6A2A" stroke-width="1.5"/>
      <path d="M42 50h12M42 54h12" stroke="#8C6A2A"/>
      <rect x="44" y="58" width="8" height="160" rx="3" fill="#23252B"/>
      <path d="M46 62v150" stroke="#45495A" stroke-width="1.5"/>
      <rect x="43" y="110" width="10" height="4" rx="1" fill="#C99A2E"/><rect x="43" y="160" width="10" height="4" rx="1" fill="#C99A2E"/>
      <path d="M44 216h8l-1 14h-6z" fill="#C99A2E" stroke="#8C6A2A" stroke-width="1.2"/>
    </svg>`,
    kaarten: `<svg viewBox="0 0 130 140" aria-hidden="true" focusable="false"><g transform="translate(65 8)">${PEG}</g>
      <rect x="57" y="12" width="16" height="22" rx="3" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><path d="M65 14v18" stroke="#7A4E2D"/>
      <g class="kaart k1"><rect x="34" y="30" width="48" height="68" rx="5" fill="#FBF6E9" stroke="#9AA0A6" stroke-width="1.5"/><text x="40" y="44" font-size="11" font-weight="800" fill="#C8323C" font-family="sans-serif">7</text><path d="M58 56l7 9-7 9-7-9z" fill="#C8323C"/></g>
      <g class="kaart k2"><rect x="44" y="30" width="48" height="68" rx="5" fill="#FBF6E9" stroke="#9AA0A6" stroke-width="1.5"/><text x="50" y="44" font-size="11" font-weight="800" fill="#C8323C" font-family="sans-serif">9</text><path d="M68 56l7 9-7 9-7-9z" fill="#C8323C"/><path d="M68 78l4 5-4 5-4-5z" fill="#C8323C"/></g>
      <g class="kaart k3"><rect x="54" y="30" width="48" height="68" rx="5" fill="#FBF6E9" stroke="#9AA0A6" stroke-width="1.5"/><text x="60" y="44" font-size="11" font-weight="800" fill="#C8323C" font-family="sans-serif">A</text><path d="M78 54l11 14-11 14-11-14z" fill="#C8323C"/></g>
      <g class="pailletten"><path d="M38 96l16 20-16 20-16-20z" fill="#C8323C" stroke="#7E1E26" stroke-width="1.5"/>
        <g fill="#F28C9A"><circle cx="38" cy="104" r="1.8"/><circle cx="32" cy="112" r="1.8"/><circle cx="44" cy="112" r="1.8"/><circle cx="38" cy="118" r="1.8"/><circle cx="30" cy="120" r="1.6"/><circle cx="46" cy="120" r="1.6"/><circle cx="38" cy="127" r="1.8"/><circle cx="34" cy="124" r="1.4"/><circle cx="42" cy="124" r="1.4"/></g></g>
    </svg>`,
    hoed: `<svg viewBox="0 0 140 120" aria-hidden="true" focusable="false"><g transform="translate(70 8)">${PEG}</g>
      <g class="krul" fill="none" stroke="#1F1A17" stroke-width="5" stroke-linecap="round"><path d="M24 84q-5 5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9"/><path d="M32 84q-5 5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9q-5 4.5 0 8"/><path d="M40 84q-5 5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9"/><path d="M116 84q5 5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9"/><path d="M108 84q5 5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9q5 4.5 0 8"/><path d="M100 84q5 5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9"/></g>
      <path d="M44 72q-2-30 14-48q12-8 24 0q14 18 14 48z" fill="#8FA3B5" stroke="#4F6070" stroke-width="2" stroke-linejoin="round"/>
      <path d="M58 24q12 6 24 0" stroke="#4F6070" stroke-width="2" fill="none"/>
      <path d="M62 30q8 10 16 0" stroke="#A9BAC8" stroke-width="2" fill="none"/>
      <path d="M44 66q26 8 52 0v8q-26 8-52 0z" fill="#2E6B4E" stroke="#1E4A35" stroke-width="1.5"/>
      <path d="M48 70q22 6 44 0" stroke="#7FBF9E" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>
      <path d="M92 64q14-16 22-30" stroke="#5C3A21" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M114 34q-6 8-4 16q8-6 4-16z" fill="#2E8B62"/>
      <path d="M14 82q56-24 112 0q-10 12-56 12t-56-12z" fill="#7F93A6" stroke="#4F6070" stroke-width="2" stroke-linejoin="round"/>
      <path d="M26 82q44-16 88 0" stroke="#A9BAC8" stroke-width="2" fill="none"/>
    </svg>`,
    staf: `<svg viewBox="0 0 84 250" aria-hidden="true" focusable="false"><g transform="translate(42 6)">${PEG}</g>
      <path d="M42 10L30 64M42 10l12 54" stroke="#7A4E2D" stroke-width="3" stroke-linecap="round" fill="none"/>
      <g class="veren"><path d="M38 20q-14-14-12-26q8 8 14 24z" fill="#23252B"/><path d="M44 18q4-16 16-22q-4 12-12 24z" fill="#23252B"/><path d="M41 18q-2-14 4-22q2 10-1 22z" fill="#E9DFC4" stroke="#B5976A"/></g>
      <path d="M36 66h12v172q0 6-6 6t-6-6z" fill="#D9C9A8" stroke="#8C7350" stroke-width="1.6"/>
      <path d="M39 70v166" stroke="#F2E8D0" stroke-width="2" stroke-linecap="round"/>
      <g fill="#C9B58A" stroke="#8C7350" stroke-width="1.4"><ellipse cx="42" cy="92" rx="8" ry="4"/><ellipse cx="42" cy="122" rx="8" ry="4"/><ellipse cx="42" cy="152" rx="8" ry="4"/><ellipse cx="42" cy="182" rx="8" ry="4"/><ellipse cx="42" cy="212" rx="8" ry="4"/></g>
      <path d="M38 100q4 6 8 0M38 160q4 6 8 0M38 196q4 6 8 0" stroke="#A88E62" stroke-width="1.2" fill="none"/>
      <rect x="35" y="132" width="14" height="12" rx="2" fill="#5C3A21"/><path d="M35 136h14M35 140h14" stroke="#3A2416"/>
      <path d="M22 36q0-24 20-24t20 24q0 10-6 16v8H28v-8q-6-6-6-16z" fill="#E9DFC4" stroke="#8C7350" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M26 30q4-12 14-14" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".7"/>
      <path d="M30 22q4 4 2 8M52 20q-2 6 2 10" stroke="#B5976A" stroke-width="1.4" fill="none"/>
      <g class="ogen"><ellipse cx="33.5" cy="38" rx="6" ry="6.5" fill="#2A1D14"/><ellipse cx="50.5" cy="38" rx="6" ry="6.5" fill="#2A1D14"/></g>
      <path d="M42 44l-3.5 6h7z" fill="#2A1D14"/>
      <g class="kaak"><path d="M29 58h26v6q0 5-5 5H34q-5 0-5-5z" fill="#E9DFC4" stroke="#8C7350" stroke-width="1.6"/><path d="M33 58v8M37 58v9M41 58v9M45 58v9M49 58v9M53 58v7" stroke="#8C7350" stroke-width="1.1"/></g>
      <path d="M29 56h26" stroke="#8C7350" stroke-width="1.4"/><path d="M33 52v4M37 52v4M41 52v4M45 52v4M49 52v4M53 52v4" stroke="#8C7350" stroke-width="1.1"/>
    </svg>`,
    klembord: `<svg viewBox="0 0 110 156" aria-hidden="true" focusable="false"><g transform="translate(55 8)">${PEG}</g>
      <rect x="14" y="22" width="82" height="126" rx="7" fill="#B07A44" stroke="#5E3A1E" stroke-width="3"/><rect x="14" y="22" width="82" height="10" rx="5" fill="#C48D55"/>
      <rect x="22" y="36" width="66" height="104" rx="2" fill="#FBF6E9" stroke="#C9C2B2" stroke-width="1.5"/>
      <text x="55" y="47" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="6.5" fill="#2F6FB5">KLINIEK</text><text x="55" y="54" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="6.5" fill="#2F6FB5">ROZENVELD</text>
      <path d="M32 58h46M32 68h46M32 78h30M32 88h46M32 98h36" stroke="#A9B8C8" stroke-width="2" stroke-linecap="round"/>
      <path d="M68 70h8M72 66v8" stroke="#C8323C" stroke-width="3" stroke-linecap="round"/>
      <path class="krabbel" d="M34 112c6-6 8 6 14 0s8 6 14 0 8 6 12-2" fill="none" stroke="#231A26" stroke-width="2" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="80"/>
      <rect x="38" y="16" width="34" height="14" rx="4" fill="#C9CFD6" stroke="#5F6A75" stroke-width="2.5"/><circle cx="55" cy="23" r="3" fill="#5F6A75"/>
      <g class="pen"><rect x="82" y="40" width="6" height="58" rx="3" fill="#231A26"/><path d="M82 98l3 8 3-8z" fill="#8C939E"/><rect x="80" y="42" width="3" height="20" rx="1.5" fill="#8C939E"/></g>
      <g transform="rotate(-6 60 128)"><rect x="40" y="118" width="46" height="18" rx="3" fill="#FFFFFF" stroke="#5F6A75" stroke-width="1.5"/><rect x="40" y="118" width="46" height="5" rx="2" fill="#2F6FB5"/><text x="63" y="133" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="7.5" fill="#231A26">Dr. de Groot</text></g>
    </svg>`,
    sigaar: `<svg viewBox="0 0 130 92" aria-hidden="true" focusable="false"><g transform="translate(65 8)">${PEG}</g>
      <path d="M65 18l-4 10" stroke="#8C939E" stroke-width="2" stroke-linecap="round"/>
      <g class="rook" opacity=".75"><path d="M106 46c-6-6 4-10-2-16s4-10-2-16" fill="none" stroke="#C9CFD6" stroke-width="3" stroke-linecap="round"/><path d="M98 44c-5-5 3-8-2-13" fill="none" stroke="#DDE2E8" stroke-width="2.5" stroke-linecap="round"/></g>
      <g transform="rotate(-14 65 60)">
        <rect x="18" y="52" width="82" height="16" rx="8" fill="#8B5A2B" stroke="#4A2E16" stroke-width="2.5"/>
        <path d="M26 56c10 2 20-2 30 0s20 2 30 0" fill="none" stroke="#6E4224" stroke-width="1.5" opacity=".7"/>
        <rect x="34" y="52" width="14" height="16" fill="#C8323C" stroke="#4A2E16" stroke-width="2"/><rect x="36" y="56" width="10" height="8" rx="1" fill="#E9B949"/>
        <rect x="92" y="52.5" width="10" height="15" rx="3" fill="#9AA0A8"/>
        <circle class="gloed" cx="103" cy="60" r="6" fill="#FF8A30"/><circle class="gloed2" cx="103" cy="60" r="3" fill="#FFD24A"/>
      </g>
    </svg>`,
    bril: `<svg viewBox="0 0 130 70" aria-hidden="true" focusable="false"><g transform="translate(65 8)">${PEG}</g>
      <defs><clipPath id="hb-l1"><circle cx="38" cy="40" r="20"/></clipPath><clipPath id="hb-l2"><circle cx="92" cy="40" r="20"/></clipPath></defs>
      <path d="M58 32q7-8 14 0" fill="none" stroke="#C99A2E" stroke-width="3"/>
      <path d="M18 36l-12-4M112 36l12-4" stroke="#C99A2E" stroke-width="3" stroke-linecap="round"/>
      <circle cx="38" cy="40" r="20" fill="#DCEBF5" fill-opacity=".55" stroke="#C99A2E" stroke-width="3.5"/>
      <circle cx="92" cy="40" r="20" fill="#DCEBF5" fill-opacity=".55" stroke="#C99A2E" stroke-width="3.5"/>
      <g class="glans"><rect x="10" y="10" width="10" height="70" fill="#fff" opacity=".85" transform="rotate(25 38 40)" clip-path="url(#hb-l1)"/><rect x="64" y="10" width="10" height="70" fill="#fff" opacity=".85" transform="rotate(25 92 40)" clip-path="url(#hb-l2)"/></g>
      <path d="M28 30q6-6 14-4" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/><path d="M82 30q6-6 14-4" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>
    </svg>`,
  };
  const PROPS = [
    { id: 'staf', b: 78, naam: 'Juan Martinez', rol: 'Fiesta de los Muertos', show: 'Toverland Halloween Nights', zin: '¡Bienvenidos a la fiesta!' },
    { id: 'kroon', b: 150, naam: 'Caspian Darius', rol: 'De God van Chaos', show: 'Graywood en de Geheime Goden van Ostarus en Gifgroeve', zin: 'Chaos!' },
    { id: 'klembord', b: 92, naam: 'Dokter de Groot', rol: 'Kliniek Rozenveld', show: 'Graywood en de Geheime Goden van Ostarus', zin: 'Kom je, Caroline?' },
    { id: 'sigaar', b: 124, naam: 'Winston Darius', rol: '', show: 'Graywood en de Geheime Goden van Ostarus', zin: 'Een sigaartje, heren?' },
    { id: 'stok', b: 64, naam: 'Erik Jacobs', rol: '', show: 'De Bokkenrijders', zin: 'Tik, tik.' },
    { id: 'kaarten', b: 124, naam: 'Roeter', rol: '', show: 'Wonderland', zin: 'Ruiten troef!' },
    { id: 'hoed', b: 140, naam: 'Hans Herzschlag', rol: 'Schlagerzanger', show: 'Voor feesten en partijen', zin: 'Prost!' },
    { id: 'bril', b: 124, naam: 'Callum', rol: '', show: 'Moonside', zin: 'Nog eentje aan de bar?' },
    { id: 'jas', b: 120, naam: 'Dorian Verstronden', rol: 'De zonde van luiheid', show: 'De Zonden van Groenhorst', zin: 'Vijf minuutjes nog...' },
  ];

  // ---------- stijl
  const stijl = document.createElement('style');
  stijl.id = 'hebbedingen-stijl';
  stijl.textContent = `
  .held { position: relative; }
  .sticker { position: absolute; z-index: 4; left: 0; top: 0; width: 120px; visibility: hidden; height: auto; --r: 5deg; transform: rotate(var(--r)); cursor: pointer; -webkit-user-select: none; user-select: none; -webkit-user-drag: none; }
  .sticker-ballon { position: absolute; z-index: 5; transform: translateX(-50%); background: var(--papier, #FBF6E9); color: var(--inkt, #1F2333); font-weight: 700; padding: .4rem .7rem; border-radius: 10px; box-shadow: 0 3px 0 rgba(0,0,0,.28); font-size: .95rem; pointer-events: none; white-space: nowrap; }
  .sticker-ballon::after { content: ""; position: absolute; left: 50%; top: -6px; width: 12px; height: 12px; background: inherit; transform: translateX(-50%) rotate(45deg); }
  .coulissen { margin-top: 3.5rem; position: relative; z-index: 1; }
  /* minder ruimte tussen het briefje en de kaarten */
  .held { margin-bottom: .6rem; }
  .rek-held { min-height: 11rem; }
  .haak-rij { padding-top: 2rem; gap: 3.2rem 1.8rem; }
  /* kaarten: elk een eigen kleur, een gekleurde kop met het icoon en een echte speelknop */
  .haak-rij .label { --kk: #C8323C; --kd: #8E1F28; }
  .haak-rij .label:not(.leeg) { filter: drop-shadow(0 6px 0 rgba(0,0,0,.28)); }
  .haak-rij .label:nth-child(6n+2) { --kk: #2F8BD6; --kd: #1E5E9A; }
  .haak-rij .label:nth-child(6n+3) { --kk: #E9A23B; --kd: #A86A1A; }
  .haak-rij .label:nth-child(6n+4) { --kk: #2E8B62; --kd: #1E5E42; }
  .haak-rij .label:nth-child(6n+5) { --kk: #7A4E9A; --kd: #523268; }
  .haak-rij .label:nth-child(6n+6) { --kk: #E8577A; --kd: #A8304E; }
  .haak-rij .label:not(.leeg) .label-kaart { display: flow-root; padding: 2.4rem 1.3rem 1.3rem; background: linear-gradient(var(--kk) 0, var(--kk) 6.6rem, var(--manila) 6.6rem); transition: transform .18s ease; }
  .haak-rij .label:not(.leeg) .label-kaart::after { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 6.6rem; background: repeating-linear-gradient(135deg, rgba(255,255,255,.13) 0 12px, transparent 12px 24px), radial-gradient(circle at 20% 110%, rgba(0,0,0,.18), transparent 60%); pointer-events: none; }
  .haak-rij .label:not(.leeg) .label-icoon { position: relative; z-index: 1; width: 5.2rem; height: 5.2rem; margin: 0 auto -.6rem; padding: .55rem; background: #FBF6E9; border-radius: 50%; box-shadow: 0 0 0 4px var(--kd), 0 5px 0 4px rgba(0,0,0,.25); }
  .haak-rij .label:not(.leeg) .soort { position: relative; z-index: 1; margin-top: 1.6rem; text-transform: uppercase; letter-spacing: .08em; font-size: .78rem; font-weight: 800; color: var(--kd); }
  .haak-rij .label:not(.leeg) .naam { color: var(--inkt); font-size: 1.85rem; }
  .haak-rij .label:not(.leeg) .doe { display: inline-flex; align-items: center; gap: .45rem; text-decoration: none; background: var(--kk); color: #fff; padding: .45rem .95rem; border-radius: 999px; box-shadow: 0 3px 0 var(--kd); font-weight: 800; }
  .haak-rij .label:not(.leeg) .doe::after { content: ""; width: 0; height: 0; border-left: .5rem solid #fff; border-top: .32rem solid transparent; border-bottom: .32rem solid transparent; }
  .haak-rij .label:not(.leeg) .label-kaart:hover .doe, .haak-rij .label:not(.leeg) .label-kaart:focus-visible .doe { background: var(--kd); }
  .haak-rij .label:not(.leeg) .label-kaart:hover .label-icoon { animation: kaartIcoon .5s ease; }
  @keyframes kaartIcoon { 30% { transform: rotate(-8deg) scale(1.08); } 60% { transform: rotate(6deg) scale(1.04); } }
  .haak-rij .label:not(.leeg) .label-kaart:focus-visible { outline: 3px solid var(--munt, #E9B949); outline-offset: -6px; }
  .haak-rij .label .stempel { background: #FBF6E9; }
  @media (prefers-reduced-motion: reduce) { .haak-rij .label:not(.leeg) .label-kaart:hover .label-icoon { animation: none; } }
  .coulissen-rij { display: block; position: relative; border-radius: 14px; padding: 2.2rem 3.6rem 2.4rem; overflow: hidden;
    background: radial-gradient(ellipse 80% 55% at 50% -8%, rgba(255,214,150,.22), transparent 70%), linear-gradient(to bottom, transparent 88%, #6E4626 88%, #5C3A21 94%, #4A2E1C 100%), linear-gradient(#2C1838, #170D20);
    box-shadow: inset 0 0 0 4px #4A0E16, inset 0 14px 0 #8E1F28, inset 0 18px 0 #E9B949, 0 8px 0 rgba(0,0,0,.35); }
  .coulissen-rij::before, .coulissen-rij::after { content: ""; position: absolute; top: 0; bottom: 0; width: 3.2rem; z-index: 2; pointer-events: none;
    background: repeating-linear-gradient(90deg, #6E1018 0 6px, #B82E3A 6px 14px, #8E1F28 14px 20px, #6E1018 20px 24px); }
  .coulissen-rij::before { left: 0; box-shadow: inset -10px 0 14px rgba(0,0,0,.45); border-radius: 14px 0 60% 14px / 14px 0 12% 14px; }
  .coulissen-rij::after { right: 0; box-shadow: inset 10px 0 14px rgba(0,0,0,.45); border-radius: 0 14px 14px 60% / 0 14px 14px 12%; }
  .coulissen .props { position: relative; z-index: 1; }
  .coulissen .prop-plek { position: relative; }
  .coulissen .prop-plek::before { content: ""; position: absolute; left: 50%; top: -2.2rem; width: 15rem; height: calc(100% + 2.6rem); transform: translateX(-50%); pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse 42% 58% at 50% 34%, rgba(255,236,180,.32), rgba(255,220,150,.12) 55%, transparent 72%); }
  .coulissen .prop, .coulissen .kaartje { z-index: 1; }
  .coulissen .prop svg { filter: drop-shadow(0 0 1.5px rgba(255,243,196,.9)) drop-shadow(0 0 12px rgba(255,214,150,.35)) drop-shadow(0 6px 0 rgba(0,0,0,.5)); }
  .coulissen .kaartje { box-shadow: 0 0 0 1px rgba(0,0,0,.2), 0 4px 0 rgba(0,0,0,.45), 0 0 18px rgba(255,214,150,.25); }
  .coulissen .kaartje::after { background: #2C1838; }
  @media (max-width: 640px) { .coulissen-rij { padding: 1.8rem 1.8rem 2rem; } .coulissen-rij::before, .coulissen-rij::after { width: 1.4rem; } .coulissen .prop-plek::before { width: 10rem; } }
  .rek.verspreid { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; z-index: 0; }
  .props { display: flex; flex-wrap: wrap; justify-content: space-around; align-items: flex-start; gap: 2.2rem 1.2rem; padding-top: 1.4rem; --s: 1; }
  .prop-plek { margin: 0; display: flex; flex-direction: column; align-items: center; }
  .prop { display: block; width: calc(var(--b) * var(--s) * 1px); padding: 0; border: 0; background: none; cursor: pointer; transform-origin: 50% 4px; -webkit-tap-highlight-color: transparent; position: relative; }
  .prop .in { display: block; transform-origin: 50% 4px; }
  .prop svg { display: block; width: 100%; height: auto; overflow: visible; filter: drop-shadow(0 5px 0 rgba(0,0,0,.25)); }
  .prop:focus-visible { outline: 3px solid var(--munt, #E9B949); outline-offset: 4px; border-radius: 8px; }
  .kaartje { position: relative; transform-origin: 50% -.9rem; margin-top: .9rem; background: var(--manila, #F2DDA0); color: var(--inkt, #1F2333); border-radius: 4px 4px 6px 6px; padding: .45rem .7rem .4rem; max-width: 12.5rem; text-align: center; box-shadow: 0 3px 0 rgba(0,0,0,.25); --r: -2deg; transform: rotate(var(--r)); line-height: 1.25; }
  .kaartje::before { content: ""; position: absolute; left: 50%; top: -.9rem; width: 2px; height: .9rem; background: #D9CFB8; }
  .kaartje::after { content: ""; position: absolute; left: calc(50% - 4px); top: .25rem; width: 8px; height: 8px; border-radius: 50%; background: var(--bord, #2F4C8F); }
  .kaartje b { display: block; margin-top: .45rem; font-size: 1rem; }
  .kaartje span { display: block; font-size: .78rem; color: var(--zacht, #5E5643); }
  .prop-ballon { position: absolute; left: 50%; top: -1.6rem; transform: translateX(-50%); background: var(--papier, #FBF6E9); color: var(--inkt, #1F2333); font-weight: 800; font-size: .9rem; padding: .2rem .6rem; border-radius: 8px; box-shadow: 0 2px 0 rgba(0,0,0,.28); white-space: nowrap; pointer-events: none; z-index: 6; }
  .zzz { position: absolute; z-index: 30; pointer-events: none; font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-weight: 800; color: #DCE4F5; text-shadow: 0 2px 0 rgba(0,0,0,.4); }
  .vonk { position: fixed; width: 6px; height: 6px; border-radius: 50%; background: #6CF2A3; box-shadow: 0 0 8px #4BE38A; pointer-events: none; z-index: 30; }
  @media (max-width: 640px) { .props { --s: .72; gap: 1.6rem .6rem; } .kaartje { max-width: 9.5rem; padding: .35rem .5rem; } .kaartje b { font-size: .88rem; } .sticker-ballon { font-size: .82rem; } }
  `;
  document.head.appendChild(stijl);

  // ---------- de sticker
  const held = document.querySelector('.held') || document.body;
  if (!document.querySelector('.sticker')) {
    const img = document.createElement('img');
    img.className = 'sticker'; img.src = 'ruben-sticker.webp'; img.alt = 'Ruben'; img.width = 380; img.height = 511; img.draggable = false;
    img.addEventListener('error', () => img.remove());
    held.prepend(img);
    // de sticker plakt net op het eind van de onderste tape van het logo
    const plaats = () => {
      const tapes = [...document.querySelectorAll('.held h1 .tape')];
      const hr = held.getBoundingClientRect(), vw = document.documentElement.clientWidth;
      if (!tapes.length) { img.style.left = (hr.width - 130) + 'px'; img.style.visibility = 'visible'; return; }
      let rechts = 0, boven = Infinity;
      tapes.forEach(t => { const r = t.getBoundingClientRect(); rechts = Math.max(rechts, r.right); boven = Math.min(boven, r.top); });
      const fs = parseFloat(getComputedStyle(tapes[tapes.length - 1]).fontSize) || 40;
      // zo groot als past: liefst ruim twee keer de letterhoogte, nooit over de letters en nooit buiten beeld
      const ruimte = vw - 8 - (rechts - fs * 0.1);
      const w = Math.round(Math.max(52, Math.min(180, fs * 2.05, ruimte / 1.12)));
      let links = rechts - hr.left - fs * 0.1;
      if (hr.left + links + w * 1.12 > vw - 4) links = vw - 4 - w * 1.12 - hr.left;
      img.style.width = w + 'px'; img.style.left = Math.round(links) + 'px'; img.style.top = Math.round(boven - hr.top - fs * 0.3) + 'px';
      img.style.visibility = 'visible';
    };
    plaats();
    window.addEventListener('resize', plaats);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { plaats(); if (window.gereedschapBouw) window.gereedschapBouw(); });
    img.addEventListener('load', plaats);
    const ZINNEN = ['Hoi! Ik ben Ruben.', 'Welkom in mijn rommelhoekje!', 'Niet zo hard prikken, ik plak er net.', 'Speel je een potje mee?'];
    let z = 0, ballon = null;
    img.addEventListener('click', () => {
      if (!reduce && img.animate) img.animate([{ transform: 'rotate(var(--r)) scale(1)' }, { transform: 'rotate(-3deg) scale(1.08)' }, { transform: 'rotate(var(--r)) scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      if (ballon) ballon.remove();
      ballon = document.createElement('div'); ballon.className = 'sticker-ballon'; ballon.textContent = ZINNEN[z++ % ZINNEN.length];
      ballon.style.left = (img.offsetLeft + img.offsetWidth / 2) + 'px'; ballon.style.top = (img.offsetTop + img.offsetHeight + 8) + 'px';
      held.appendChild(ballon);
      const b = ballon; setTimeout(() => { if (b === ballon) { b.remove(); ballon = null; } }, 2600);
      toon(660, 0, 0.1, 'triangle', 0.04); toon(880, 0.08, 0.14, 'triangle', 0.04);
    });
  }

  // ---------- uit de coulissen
  const sectie = document.createElement('section');
  sectie.className = 'coulissen'; sectie.setAttribute('aria-label', 'Uit de coulissen');
  sectie.innerHTML = `<h2><span>Uit de coulissen</span></h2>
    <div class="coulissen-rij">
      <div class="props">${PROPS.map(p => `<figure class="prop-plek"><button class="prop" type="button" data-prop="${p.id}" aria-label="${p.naam}, ${p.show}" style="--b:${p.b}"><span class="in">${SVG[p.id]}</span></button><figcaption class="kaartje"><b>${p.naam}</b>${p.rol ? `<span>${p.rol}</span>` : ''}<span><i>${p.show}</i></span></figcaption></figure>`).join('')}</div>
    </div>`;
  const rij = document.querySelector('.haak-rij'), main = document.querySelector('main');
  if (rij) rij.after(sectie); else if (main) main.appendChild(sectie); else document.body.appendChild(sectie);

  const $p = id => sectie.querySelector(`[data-prop="${id}"]`);
  const binnen = id => $p(id).querySelector('.in');
  const anim = (el, frames, opt) => (reduce || !el.animate ? null : el.animate(frames, opt));
  const wacht = ms => new Promise(r => setTimeout(r, ms));
  const bezig = new Set();
  function ballon(id, t) {
    const k = $p(id), oud = k.querySelector('.prop-ballon'); if (oud) oud.remove();
    const s = document.createElement('span'); s.className = 'prop-ballon'; s.textContent = t; k.appendChild(s);
    setTimeout(() => s.remove(), 1700);
  }
  const DOEN = {
    // Dorian: de zonde van luiheid. De jas zakt langzaam in slaap, en er komen Zzz'jes uit
    jas: async () => {
      if (bezig.has('jas')) return; bezig.add('jas');
      for (let i = 0; i < 3; i++) { toon(110, i * 1.1, 0.8, 'sine', 0.05, 82); toon(165, i * 1.1 + 0.55, 0.45, 'triangle', 0.025, 220); }
      const k = $p('jas'), r = k.getBoundingClientRect();
      anim(binnen('jas'), [{ transform: 'rotate(0)' }, { transform: 'rotate(7deg)', offset: .25 }, { transform: 'rotate(5deg)', offset: .5 }, { transform: 'rotate(8deg)', offset: .75 }, { transform: 'rotate(0)' }], { duration: 3400, easing: 'ease-in-out' });
      const das = k.querySelector('.das'); das.style.transformBox = 'fill-box'; das.style.transformOrigin = '50% 0';
      anim(das, [{ transform: 'rotate(0)' }, { transform: 'rotate(14deg)', offset: .5 }, { transform: 'rotate(0)' }], { duration: 3400, easing: 'ease-in-out' });
      if (!reduce) for (let i = 0; i < 4; i++) {
        const z = document.createElement('span'); z.className = 'zzz'; z.textContent = 'Z'; z.style.left = (r.left + r.width * 0.62) + 'px'; z.style.top = (r.top + r.height * 0.18 + scrollY) + 'px'; z.style.fontSize = (14 + i * 5) + 'px';
        document.body.appendChild(z);
        z.animate([{ transform: 'translate(0,0) rotate(-10deg)', opacity: 0 }, { opacity: 1, offset: .2 }, { transform: `translate(${30 + i * 12}px, ${-60 - i * 14}px) rotate(12deg)`, opacity: 0 }], { duration: 2000, delay: i * 650, easing: 'ease-out', fill: 'both' }).onfinish = () => z.remove();
      }
      ballon('jas', 'Vijf minuutjes nog...');
      await wacht(3400); bezig.delete('jas');
    },
    // Caspian: groene chaosvonken
    kroon: async () => {
      const k = $p('kroon'), r = k.getBoundingClientRect();
      [110, 116.5, 155.6].forEach(f => toon(f, 0, 1.3, 'sawtooth', 0.025));
      toon(880, 0.15, 0.6, 'sine', 0.03, 1760);
      const gl = k.querySelector('.gloed');
      anim(gl, [{ opacity: 0 }, { opacity: 1, offset: .3 }, { opacity: 0 }], { duration: 1400 });
      anim(k.querySelector('svg'), [{ filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }, { filter: 'drop-shadow(0 0 18px #4BE38A)', offset: .3 }, { filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }], { duration: 1400 });
      if (!reduce) for (let i = 0; i < 26; i++) {
        const v = document.createElement('span'); v.className = 'vonk';
        const x = r.left + r.width / 2 + (Math.random() - .5) * r.width * .6, y = r.top + r.height * .55;
        v.style.left = x + 'px'; v.style.top = y + 'px'; document.body.appendChild(v);
        const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 90;
        v.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 30}px) scale(.3)`, opacity: 0 }], { duration: 700 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => v.remove();
      }
      ballon('kroon', 'Chaos!');
    },
    // Erik: de wandelstok draait een rondje en tikt
    stok: async () => {
      if (bezig.has('stok')) return; bezig.add('stok');
      const a = anim(binnen('stok'), [{ transform: 'rotate(0)' }, { transform: 'rotate(-25deg)', offset: .2 }, { transform: 'rotate(335deg)', offset: .8 }, { transform: 'rotate(360deg)' }], { duration: 1000, easing: 'ease-in-out' });
      if (a) await a.finished;
      for (let i = 0; i < 2; i++) { toon(1200, i * 0.22, 0.05, 'square', 0.04); toon(300, i * 0.22, 0.08, 'triangle', 0.05); }
      ballon('stok', 'Tik, tik.');
      bezig.delete('stok');
    },
    // Roeter: de kaarten waaieren uit en de pailletten schitteren
    kaarten: async () => {
      if (bezig.has('kaarten')) return; bezig.add('kaarten');
      for (let i = 0; i < 6; i++) toon(500 + Math.random() * 900, i * 0.05, 0.03, 'square', 0.02);
      const k = $p('kaarten');
      [['k1', -28], ['k2', 0], ['k3', 28]].forEach(([c, h], i) => { const el = k.querySelector('.' + c); el.style.transformBox = 'view-box'; el.style.transformOrigin = '68px 96px'; anim(el, [{ transform: 'rotate(0)' }, { transform: `rotate(${h}deg) translateY(-6px)`, offset: .5 }, { transform: 'rotate(0)' }], { duration: 900, delay: i * 60, easing: 'ease-in-out' }); });
      k.querySelectorAll('.pailletten circle').forEach((c, i) => anim(c, [{ fill: '#F28C9A' }, { fill: '#FFF3C4' }, { fill: '#F28C9A' }], { duration: 300, delay: i * 60, iterations: 2 }));
      ballon('kaarten', 'Ruiten troef!');
      await wacht(950); bezig.delete('kaarten');
    },
    // Hans: hoedje omhoog en een schlagerdeuntje
    hoed: async () => {
      if (bezig.has('hoed')) return; bezig.add('hoed');
      const bas = [98, 147, 110, 147, 98, 147, 130.8, 147], mel = [392, 0, 440, 494, 523, 0, 494, 440];
      bas.forEach((f, i) => { toon(f, i * 0.2, 0.18, 'triangle', 0.05); if (mel[i]) toon(mel[i], i * 0.2 + 0.1, 0.16, 'square', 0.02); });
      anim(binnen('hoed'), [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-26px) rotate(-12deg)', offset: .3 }, { transform: 'translateY(-26px) rotate(12deg)', offset: .55 }, { transform: 'translateY(0) rotate(0)', offset: .8 }, { transform: 'translateY(-6px) rotate(-3deg)', offset: .9 }, { transform: 'translateY(0) rotate(0)' }], { duration: 1500, easing: 'ease-in-out' });
      ballon('hoed', 'Prost!');
      await wacht(1600); bezig.delete('hoed');
    },
    // Juan: de ogen gloeien, de kaak klappert en er vliegen goudsbloemblaadjes
    staf: async () => {
      if (bezig.has('staf')) return; bezig.add('staf');
      const k = $p('staf'), r = k.getBoundingClientRect();
      [523, 659, 784, 1047, 784, 1047].forEach((f, i) => toon(f, i * 0.11, 0.16, 'square', 0.03));
      [262, 330, 392].forEach(f => toon(f, 0.66, 0.5, 'triangle', 0.035));
      k.querySelectorAll('.ogen ellipse').forEach(e => anim(e, [{ fill: '#2A1D14' }, { fill: '#F2A93B', offset: .2 }, { fill: '#F2A93B', offset: .8 }, { fill: '#2A1D14' }], { duration: 1600 }));
      anim(k.querySelector('svg'), [{ filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }, { filter: 'drop-shadow(0 0 14px #F2A93B)', offset: .25 }, { filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }], { duration: 1600 });
      const kaak = k.querySelector('.kaak');
      anim(kaak, [{ transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }], { duration: 900 });
      if (!reduce) for (let i = 0; i < 22; i++) {
        const v = document.createElement('span'); v.className = 'vonk';
        v.style.background = ['#F2A93B', '#E8702A', '#F6CB2F', '#C8323C'][i % 4]; v.style.boxShadow = 'none'; v.style.borderRadius = '60% 40% 60% 40%'; v.style.width = v.style.height = (6 + Math.random() * 5) + 'px';
        v.style.left = (r.left + r.width / 2) + 'px'; v.style.top = (r.top + r.height * .14) + 'px'; document.body.appendChild(v);
        const a = -Math.PI / 2 + (Math.random() - .5) * 2.4, d = 60 + Math.random() * 90;
        v.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 140}px) rotate(${Math.random() * 540}deg)`, opacity: 0 }], { duration: 1300 + Math.random() * 700, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = () => v.remove();
      }
      ballon('staf', '¡Bienvenidos a la fiesta!');
      await wacht(1600); bezig.delete('staf');
    },
    // Dokter de Groot: de pen krabbelt iets op de patiëntenkaart
    klembord: async () => {
      if (bezig.has('klembord')) return; bezig.add('klembord');
      const p = $p('klembord'), kr = p.querySelector('.krabbel'), pen = p.querySelector('.pen');
      for (let k = 0; k < 6; k++) toon(900 + Math.random() * 500, k * 0.07, 0.05, 'triangle', 0.015);
      anim(kr, [{ strokeDashoffset: 80 }, { strokeDashoffset: 0 }], { duration: 650, easing: 'ease-out', fill: 'forwards' });
      anim(pen, [{ transform: 'translate(0,0) rotate(0)' }, { transform: 'translate(-44px,18px) rotate(-18deg)' }, { transform: 'translate(-18px,14px) rotate(-12deg)' }, { transform: 'translate(0,0) rotate(0)' }], { duration: 900, easing: 'ease-in-out' });
      ballon('klembord', 'Kom je, Caroline?');
      await wacht(1500); anim(kr, [{ strokeDashoffset: 0 }, { strokeDashoffset: 80 }], { duration: 300, fill: 'forwards' }); bezig.delete('klembord');
    },
    // Winston Darius: de sigaar gloeit op en er kringelt rook omhoog
    sigaar: async () => {
      if (bezig.has('sigaar')) return; bezig.add('sigaar');
      const p = $p('sigaar'), r = p.querySelector('.rook'), gl = p.querySelector('.gloed'), gl2 = p.querySelector('.gloed2');
      toon(180, 0, 0.5, 'sine', 0.02);
      anim(gl, [{ fill: '#FF8A30' }, { fill: '#FFB347' }, { fill: '#FF8A30' }], { duration: 900 }); anim(gl2, [{ opacity: 1 }, { opacity: .3 }, { opacity: 1 }], { duration: 900 });
      anim(r, [{ transform: 'translateY(0)', opacity: .75 }, { transform: 'translateY(-18px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 0 }, { transform: 'translateY(0)', opacity: .75 }], { duration: 1600, easing: 'ease-out' });
      ballon('sigaar', 'Een sigaartje, heren?');
      await wacht(1600); bezig.delete('sigaar');
    },
    // Callum: een glinstering over de glazen
    bril: async () => {
      if (bezig.has('bril')) return; bezig.add('bril');
      toon(1568, 0, 0.25, 'sine', 0.04); toon(2349, 0.08, 0.3, 'sine', 0.03);
      const gl = $p('bril').querySelector('.glans');
      anim(gl, [{ transform: 'translateX(-40px)' }, { transform: 'translateX(60px)' }], { duration: 700, easing: 'ease-in-out' });
      ballon('bril', 'Nog eentje aan de bar?');
      await wacht(800); bezig.delete('bril');
    },
  };
  sectie.addEventListener('click', e => { const b = e.target.closest('[data-prop]'); if (b && DOEN[b.dataset.prop]) DOEN[b.dataset.prop](); });

  // het gereedschap hangt verspreid over de hele pagina: een paar in het rek bij de titel, de rest los
  const heldRek = document.getElementById('rek-held');
  if (heldRek) heldRek.dataset.gereedschap = 'zaag,hamer,tang';
  const overal = document.createElement('div');
  overal.className = 'rek verspreid'; overal.id = 'rek-overal'; overal.setAttribute('aria-hidden', 'true');
  overal.dataset.gereedschap = 'waterpas,boor,verfroller,schroevendraaier,klem,plakband,rolmaat,beitel,ijzerzaag,steeksleutel,kwast,schaar,duimstok';
  document.body.appendChild(overal);
  const zetHoogte = () => { overal.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + 'px'; };
  zetHoogte(); addEventListener('resize', zetHoogte);
  // het gereedschap opnieuw ophangen nu er een plank en sticker bij zijn
  if (window.gereedschapBouw) setTimeout(window.gereedschapBouw, 60);
})();

})();
;(function () {
(function () {
  // GRAPJES: verborgen grapjes op het rommelhoekje. Geen teller, geen hints: wie ze vindt, vindt ze.
  if (window.Grapjes) return;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opHome = !!document.querySelector('.haak-rij');

  const stijl = document.createElement('style');
  stijl.textContent = `
    .gr-vallen { position: fixed; top: -40px; z-index: 9998; pointer-events: none; }
    .gr-groot { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 9998; pointer-events: none; font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 800; font-size: clamp(3rem, 14vw, 9rem); color: #F6CB2F; text-shadow: 0 6px 0 #C8323C, 0 12px 0 #2E8B62; }
    dialog.gr-boek { border: 0; border-radius: 12px; padding: 1.2rem 1.3rem; background: #F2DDA0; color: #1F2333; max-width: min(28rem, 94vw); font-family: "Bricolage Grotesque", system-ui, sans-serif; box-shadow: 0 6px 0 rgba(0,0,0,.35); }
    dialog.gr-boek::backdrop { background: rgba(10,14,30,.7); }
    .gr-boek h2 { margin: 0 0 .4rem; } .gr-boek ul { list-style: none; padding: 0; margin: .6rem 0; }
    .gr-boek li { display: flex; gap: .6rem; align-items: center; padding: .35rem 0; border-bottom: 1px solid #D9BE78; }
    .gr-boek li small { display: block; color: #5E5643; }
    .gr-boek button { font: inherit; font-weight: 700; border: 0; border-radius: 6px; padding: .5rem 1rem; background: #C8323C; color: #fff; cursor: pointer; }
    .gr-gat { position: absolute; width: 34px; height: 20px; border-radius: 17px 17px 0 0; background: #0E1630; box-shadow: inset 0 4px 0 #070B18; z-index: 2; cursor: pointer; }
    .gr-muis { position: absolute; left: 6px; bottom: 0; width: 22px; height: 14px; transform: translateY(14px); transition: transform .35s ease; }
    .gr-gat.uit .gr-muis { transform: translateY(2px); }
    .gr-gat { overflow: hidden; }
    .gr-uil { position: absolute; z-index: 3; width: 56px; cursor: pointer; }
    .gr-ballon { position: absolute; z-index: 4; background: #FBF6E9; color: #1F2333; font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 700; font-size: .9rem; padding: .3rem .6rem; border-radius: 8px; box-shadow: 0 2px 0 rgba(0,0,0,.3); white-space: nowrap; pointer-events: none; }
    .gr-vlaggen { position: fixed; left: 0; right: 0; top: 0; height: 34px; z-index: 50; pointer-events: none; }
    @keyframes gr-schud { 10%, 50%, 90% { transform: translate(-6px, 2px); } 30%, 70% { transform: translate(6px, -2px); } }
  `;
  document.head.appendChild(stijl);

  // ---------- geluidje
  let ac = null;
  function toon(f, t0, d, type, v) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + (t0 || 0); o.type = type || 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(v || 0.05, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d + 0.05); } catch (e) {} }
  
  const boek = document.createElement('dialog'); boek.className = 'gr-boek';
  document.body.appendChild(boek);
  const vind = () => {};

  // ---------- vlaaienregen
  const VLAAI = '<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#C98A43" stroke="#7A4E2D" stroke-width="2"/><circle cx="20" cy="20" r="13" fill="#A8162B"/><path d="M8 20h24M20 8v24M11 11l18 18M29 11L11 29" stroke="#E0B07A" stroke-width="2"/><circle cx="20" cy="20" r="3" fill="#E0B07A"/></svg>';
  function regen(html, n) {
    for (let i = 0; i < (reduce ? 6 : n); i++) {
      const v = document.createElement('div'); v.className = 'gr-vallen'; v.innerHTML = html;
      v.style.left = (Math.random() * 96) + 'vw'; document.body.appendChild(v);
      const duur = 2200 + Math.random() * 1600, draai = (Math.random() - 0.5) * 720;
      if (v.animate) v.animate([{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(${innerHeight + 80}px) rotate(${draai}deg)` }], { duration: duur, delay: Math.random() * 900, easing: 'ease-in', fill: 'both' }).onfinish = () => v.remove();
      else setTimeout(() => v.remove(), 3000);
    }
  }
  function confetti() {
    const kl = ['#C8323C', '#F6CB2F', '#2E8B62'];
    for (let i = 0; i < (reduce ? 10 : 90); i++) regen(`<span style="display:block;width:9px;height:14px;background:${kl[i % 3]};border-radius:2px"></span>`, 1);
  }
  function grootWoord(t) { const g = document.createElement('div'); g.className = 'gr-groot'; g.textContent = t; document.body.appendChild(g); if (g.animate) g.animate([{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1, offset: .35 }, { transform: 'scale(1)', opacity: 1, offset: .8 }, { opacity: 0 }], { duration: 2000 }).onfinish = () => g.remove(); else setTimeout(() => g.remove(), 1800); }

  // ---------- typen
  let getypt = '';
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key.length !== 1) return;
    getypt = (getypt + e.key.toLowerCase()).slice(-14);
    if (getypt.endsWith('vlaai')) { regen(VLAAI, 34); [523, 659, 784].forEach((f, i) => toon(f, i * 0.12, 0.25)); vind('vlaai'); getypt = ''; }
    else if (getypt.endsWith('alaaf')) { confetti(); grootWoord('Alaaf!'); [392, 523, 659, 784, 659, 784].forEach((f, i) => toon(f, i * 0.13, 0.22, 'square', 0.03)); vind('alaaf'); getypt = ''; }
    else if (getypt.endsWith('ejkeohlemmor')) {
      getypt = ''; vind('spiegel');
      document.documentElement.style.transition = 'transform .6s ease'; document.documentElement.style.transform = 'scaleX(-1)';
      setTimeout(() => { document.documentElement.style.transform = ''; setTimeout(() => { document.documentElement.style.transition = ''; }, 700); }, 3500);
    }
  });

  // ---------- klik-reeksen
  const tellers = {};
  function tel(id, nodig, venster) { const nu = Date.now(), t = (tellers[id] || []).filter(x => nu - x < venster); t.push(nu); tellers[id] = t; if (t.length >= nodig) { tellers[id] = []; return true; } return false; }
  document.addEventListener('click', e => {
    const st = e.target.closest && e.target.closest('.sticker');
    if (st && tel('sticker', 10, 8000)) {
      vind('sticker');
      if (!reduce && st.animate) st.animate([{ transform: 'rotate(var(--r)) scale(1)' }, { transform: 'rotate(360deg) scale(1.4)', offset: .5 }, { transform: 'rotate(720deg) scale(1)' }], { duration: 1200, easing: 'ease-in-out' });
      const b = document.createElement('div'); b.className = 'gr-ballon'; b.textContent = 'Oké, oké! Je mag me hebben.'; const r = st.getBoundingClientRect(); b.style.left = (r.left + scrollX - 40) + 'px'; b.style.top = (r.bottom + scrollY + 6) + 'px'; document.body.appendChild(b); setTimeout(() => b.remove(), 2800);
    }
    const ham = e.target.closest && e.target.closest('.gs-hamer, .tg-rommel[data-rommel="dobbelsteen"], .tg-rommel[aria-label="Geef de dobbelsteen een zetje"]'); // vroeger de hamer, nu het rommeltje dobbelsteen
    if (ham && tel('hamer', 6, 3500)) {
      vind('duim'); toon(110, 0, 0.3, 'square', 0.06); toon(90, 0.08, 0.3, 'square', 0.05);
      if (!reduce) document.body.style.animation = 'gr-schud .5s'; setTimeout(() => { document.body.style.animation = ''; }, 520);
      grootWoord('Au!');
    }
    const ver = e.target.closest && e.target.closest('.versie');
    if (ver && tel('versie', 5, 3000)) {
      vind('bouwplaats');
      boek.innerHTML = `<h2>De geheime bouwplaats</h2><p>Welkom achter de schermen van het rommelhoekje. Een paar eerlijke cijfers:</p><ul><li>Vlaaien gegeten tijdens het bouwen: 37</li><li>Kopjes koffie: veel te veel</li><li>Keren dat Harrie zijn sok kwijt was: 15</li><li>Rommeltjes die een zetje kregen: ${Math.floor(Date.now() / 86400000) % 900 + 120}</li><li>Rommelbeesten die op een theepot lijken: 2</li></ul><button type="button">Terug naar de voorkant</button>`;
      boek.querySelector('button').addEventListener('click', () => boek.close()); boek.showModal();
    }
  });

  // ---------- alleen op de homepage: het muisje, de nachtuil en de elfde van de elfde
  function homepage() {
    if (!opHome) return;
    const main = document.querySelector('main') || document.body;
    // muizengat onder aan de pagina
    const gat = document.createElement('div'); gat.className = 'gr-gat'; gat.setAttribute('aria-label', 'Een muizengaatje'); gat.setAttribute('role', 'button'); gat.tabIndex = 0;
    gat.innerHTML = '<svg class="gr-muis" viewBox="0 0 22 14" aria-hidden="true"><ellipse cx="11" cy="10" rx="9" ry="6" fill="#9AA0A6"/><circle cx="5" cy="5" r="3" fill="#C9CED6"/><circle cx="17" cy="5" r="3" fill="#C9CED6"/><circle cx="8" cy="9" r="1.2" fill="#1F2333"/><circle cx="14" cy="9" r="1.2" fill="#1F2333"/><circle cx="11" cy="12" r="1.3" fill="#E8577A"/></svg>';
    const zetGat = () => { const voet = document.querySelector('footer') || main; const r = voet.getBoundingClientRect(); gat.style.left = Math.max(10, r.right + scrollX - 70) + 'px'; gat.style.top = (r.top + scrollY - 20) + 'px'; };
    document.body.appendChild(gat); zetGat(); addEventListener('resize', zetGat); setTimeout(zetGat, 1500);
    let uit = false;
    const kijk = () => { uit = true; gat.classList.add('uit'); setTimeout(() => { uit = false; gat.classList.remove('uit'); }, 2600); setTimeout(kijk, 9000 + Math.random() * 12000); };
    setTimeout(kijk, 5000 + Math.random() * 6000);
    const pak = () => { if (!uit) return; vind('muis'); toon(2200, 0, 0.08, 'sine', 0.05); toon(2600, 0.08, 0.08, 'sine', 0.05); gat.classList.remove('uit'); uit = false; const b = document.createElement('div'); b.className = 'gr-ballon'; b.textContent = 'Piep!'; b.style.left = (parseFloat(gat.style.left) - 40) + 'px'; b.style.top = (parseFloat(gat.style.top) - 30) + 'px'; document.body.appendChild(b); setTimeout(() => b.remove(), 2000); };
    gat.addEventListener('click', pak); gat.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') pak(); });
    // nachtuil tussen middernacht en vijf uur
    const uur = new Date().getHours();
    if (uur < 5) {
      const uil = document.createElement('div'); uil.className = 'gr-uil'; uil.setAttribute('role', 'button'); uil.tabIndex = 0; uil.setAttribute('aria-label', 'Een uil');
      uil.innerHTML = '<svg viewBox="0 0 56 64" aria-hidden="true"><path d="M8 20l6-14 8 10h12l8-10 6 14v26q0 14-20 14T8 46z" fill="#8C6A44" stroke="#3A2414" stroke-width="2.5"/><ellipse cx="28" cy="46" rx="12" ry="11" fill="#E8D5A8"/><circle cx="19" cy="27" r="8" fill="#FBF6E9" stroke="#3A2414" stroke-width="2"/><circle cx="37" cy="27" r="8" fill="#FBF6E9" stroke="#3A2414" stroke-width="2"/><circle cx="20" cy="28" r="4" fill="#1F2333"/><circle cx="36" cy="28" r="4" fill="#1F2333"/><path d="M25 34l3 5 3-5z" fill="#E9B949"/><path d="M20 58v4M36 58v4" stroke="#E9B949" stroke-width="3"/></svg>';
      const held = document.querySelector('.held') || main; const r = held.getBoundingClientRect(); uil.style.left = (r.left + scrollX + Math.min(r.width - 70, 460)) + 'px'; uil.style.top = (r.top + scrollY + 150) + 'px';
      document.body.appendChild(uil);
      const oehoe = () => { vind('uil'); toon(392, 0, 0.35, 'sine', 0.06); toon(330, 0.4, 0.5, 'sine', 0.06); const b = document.createElement('div'); b.className = 'gr-ballon'; b.textContent = 'Oehoe! Jij bent ook laat op, hè?'; b.style.left = (parseFloat(uil.style.left) - 60) + 'px'; b.style.top = (parseFloat(uil.style.top) - 34) + 'px'; document.body.appendChild(b); setTimeout(() => b.remove(), 3000); };
      uil.addEventListener('click', oehoe); uil.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') oehoe(); });
    }
    // de elfde van de elfde: vlaggetjes in rood, geel en groen
    const d = new Date();
    if (d.getMonth() === 10 && d.getDate() === 11) {
      const v = document.createElement('div'); v.className = 'gr-vlaggen';
      let svg = '<svg width="100%" height="34" preserveAspectRatio="none" viewBox="0 0 1000 34" aria-hidden="true"><path d="M0 4Q500 22 1000 4" stroke="#F2DDA0" stroke-width="2" fill="none"/>';
      for (let i = 0; i < 40; i++) { const x = i * 25 + 5, y = 4 + Math.sin(Math.PI * x / 1000) * 14; svg += `<path d="M${x} ${y.toFixed(1)}l14 0l-7 16z" fill="${['#C8323C', '#F6CB2F', '#2E8B62'][i % 3]}"/>`; }
      v.innerHTML = svg + '</svg>'; document.body.appendChild(v);
      setTimeout(() => { grootWoord('Alaaf!'); vind('elfelf'); }, 1200);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', homepage); else homepage();

  // ---------- voor wie in de console kijkt
  try { console.log('%cHé, nieuwsgierig aagje!', 'font: 800 20px sans-serif; color: #C8323C'); console.log('%cHier valt niks te zien. Of toch wel?', 'font: 600 13px sans-serif; color: #2F4C8F'); } catch (e) {}
  window.Grapjes = true;
})();

})();

/* home_v6.js: de homepage als tegels (richting A), met licht en donker.
   Leest de categorieën, kaartjes en voortgang die home_v8 opbouwt, en tekent ze als tegels.
   Het logo, de sticker en de coulissen komen uit hun eigen onderdelen en blijven zoals ze zijn. */
(() => {
  'use strict';
  if (window.__v6) return;
  const $ = s => document.querySelector(s);
  const veilig = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const minder = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  // ================= licht en donker
  const THEMA = 'rommelhoekje-thema';
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  const keuze = () => { try { const k = localStorage.getItem(THEMA); return k === 'licht' || k === 'donker' ? k : 'auto'; } catch (e) { return 'auto'; } };
  function pasThemaToe() {
    const k = keuze(), donker = k === 'donker' || (k === 'auto' && mq.matches);
    document.documentElement.dataset.thema = donker ? 'donker' : 'licht';
    document.querySelectorAll('.tg-weergave button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.thema === k)));
  }
  pasThemaToe();
  if (mq.addEventListener) mq.addEventListener('change', pasThemaToe); else if (mq.addListener) mq.addListener(pasThemaToe);
  addEventListener('storage', e => { if (e.key === THEMA) pasThemaToe(); });

  // ================= korte zinnen onder de tegels
  const ONDERSCHRIFT = { 'rommelcasino.html': 'Speelfiches, neon en een rekenuil', 'rommelgroepjes.html': 'Zestien woorden, vier groepjes', 'cryptisch.html': 'Eén zin, één woord, geen hints', 'letterval.html': 'Veeg woorden uit de letterkist', 'klinkermijnen.html': 'Vind de woorden, ontwijk de klinkers', 'reclame.html': 'Zes reclamespelletjes, maar dan echt', 'huisopstelten.html': 'Twee katten en een lijstje streken', 'rubendeduiker.html': 'Overdag duiken, \'s avonds koken', 'rommelhotel-online.html': 'Live met je vrienden', 'rommelhotel.html': 'Een pixelhotel om in rond te lopen', 'rommelblok.html': 'Bouw je eigen blokkenwereld', 'rommelland.html': 'Bouw je eigen 3D-pretpark', 'rommelarend.html': 'Vlieg als arend over vier wereldsteden', 'rommelbeesten.html': 'Pakjes, kaarten en gevechten', 'vlaaienbakker.html': 'Bak een Limburgs vlaaienrijk', 'rommelpoker.html': 'Poker op de rommelmarkt', 'vouwvlieger.html': 'Vouw, gooi en vlieg zo ver je kunt', 'rommelritme.html': 'Spring op de maat van de muziek', 'rob.html': 'Geef Rob een duimpje', 'productiefiets.html': 'Fiets over het Bata-terrein', 'rommelwheels.html': 'Slappe poppetjes, rare karretjes', 'steigerstress.html': 'Laad de steiger in voor Jan', 'rommelwoord.html': 'Raad het woord van de dag', 'rommelkroon.html': 'Eén kroon per rij, kolom en kleur', 'rommelbel.html': 'Schiet bellen van dezelfde kleur', 'rommelsteek.html': 'Rustig borduren, steek voor steek', 'scorebord.html': 'Wie staat er bovenaan?', 'ideeenbox.html': 'Stuur je idee in', 'mengelmoes.html': 'Combineer alles tot iets nieuws', 'opgevoel.html': 'Hoe goed is je gevoel?', 'rommelrecht.html': 'Rustig opruimen, alles op zijn plek' };
  const LOS = /\s+(een|de|het|en|van|met|door|over|op|in|aan|naar|je|om|te|voor|bij|uit|als|of|tot)$/i;
  const kort = s => { s = String(s || '').trim().replace(/\s+/g, ' '); if (s.length <= 40) return s.replace(/[.!]$/, ''); let z = s.split(/[.!?:;]/)[0].trim(); if (z.length > 40) { const k = z.indexOf(','); z = k >= 14 && k <= 40 ? z.slice(0, k) : z.slice(0, 41).replace(/\s+\S*$/, ''); } while (LOS.test(z)) z = z.replace(LOS, ''); return z; };
  const KLEUREN = ['#FFD9C7', '#CDE7D8', '#D5E3F7', '#FBE3A1', '#E9D7F2', '#FFD3DF', '#CFEDEE', '#F4DCC2', '#DDE8C4', '#F8CFC4', '#E2DDF7'];
  const VORMEN = ['tg-v1', 'tg-v2', 'tg-v3', 'tg-v4'];


  // ================= de stijl
  const CSS = `
:root { --tg-bg: #FBF6E9; --tg-stip: rgba(35,26,38,.06); --tg-tekst: #231A26; --tg-zacht: #5A4A3C; --tg-knop: #FFFFFF; --tg-knop-tekst: #231A26; --tg-knop-rand: #231A26; --tg-actief: #231A26; --tg-actief-tekst: #FBF6E9; --tg-rand: #231A26; --tg-schaduw: none; --tg-zweef: 0 12px 0 -4px rgba(35,26,38,.2); --tg-brief: #FFFFFF; --tg-focus: #2F6FB5; }
html[data-thema="donker"] { --tg-bg: #1C1A24; --tg-stip: rgba(255,255,255,.07); --tg-tekst: #F6F2EA; --tg-zacht: #CFC5B4; --tg-knop: #2B2733; --tg-knop-tekst: #F6F2EA; --tg-knop-rand: #F6F2EA; --tg-actief: #FFE76A; --tg-actief-tekst: #231A26; --tg-rand: #0E0C12; --tg-schaduw: 0 6px 0 rgba(0,0,0,.45); --tg-zweef: 0 14px 0 -4px rgba(0,0,0,.55); --tg-brief: #FBF6E9; --tg-focus: #FFE76A; color-scheme: dark; }
html, body.v6-body { background-color: var(--tg-bg) !important; background-image: radial-gradient(circle at 1px 1px, var(--tg-stip) 1.4px, transparent 0) !important; background-size: 24px 24px !important; }
body.v6-body { color: var(--tg-tekst); transition: background-color .3s ease; }
.v6-body .rek, .v6-body .gs, .v6-body .muurlaag, .v6-body .v8, .v6-body .terughangen { display: none !important; }
.v6-body .briefje { background: var(--tg-brief) !important; color: #1F2333; }
.v6-body footer { color: var(--tg-zacht) !important; }
.v6-body footer .versie { color: #F6F2EA !important; }
.v6-body footer a, .v6-body .v8-links a, .v6-body .v8-links button { color: var(--tg-tekst) !important; }
.v6-body .held { position: relative; }
.tg-balk { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin: 0 0 2rem; }
.tg-balk .tg-filters { margin: 0; flex: 1 1 auto; min-width: 0; }
.tg-weergave { flex: none; display: flex; gap: 4px; padding: 4px; border-radius: 999px; background: var(--tg-knop); border: 2.5px solid var(--tg-knop-rand); box-shadow: 0 3px 0 rgba(0,0,0,.2); }
.tg-weergave button { display: flex; align-items: center; gap: 7px; min-height: 44px; padding: 0 15px; border-radius: 999px; border: 0; background: transparent; color: var(--tg-knop-tekst); font: inherit; font-weight: 800; font-size: .88rem; cursor: pointer; }
.tg-weergave button[aria-pressed="true"] { background: var(--tg-actief); color: var(--tg-actief-tekst); }
.tg-weergave svg { width: 18px; height: 18px; flex: none; }
.tg-weergave button:focus-visible, .tg-filters button:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 2px; }
.tg { margin: 1.2rem 0 3.2rem; }
.tg-filters { display: flex; gap: .6rem; flex-wrap: wrap; margin: 0 0 2rem; }
.tg-filters button { font: inherit; font-weight: 800; font-size: .95rem; padding: .5rem 1rem; min-height: 44px; border-radius: 999px; border: 2.5px solid var(--tg-knop-rand); background: var(--tg-knop); color: var(--tg-knop-tekst); cursor: pointer; white-space: nowrap; }
.tg-filters button[aria-pressed="true"] { background: var(--tg-actief); color: var(--tg-actief-tekst); }
.tg h2 { margin: 0 0 1.4rem; }
.tg-raster { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr)); gap: 2.2rem 1.6rem; }
.tg-tegel { display: flex; flex-direction: column; gap: .6rem; text-decoration: none; color: var(--tg-tekst); }
.tg-tegel[hidden] { display: none; }
.tg-vlak { position: relative; display: grid; place-items: center; aspect-ratio: 1 / 1; border-radius: 1.5rem; border: 3px solid var(--tg-rand); overflow: hidden; box-shadow: var(--tg-schaduw); transition: transform .18s ease, box-shadow .18s ease; }
.tg-vlak::before { content: ''; position: absolute; aspect-ratio: 1 / 1; background: rgba(255,255,255,.5); }
.tg-v1::before { right: -20%; top: -20%; width: 72%; border-radius: 50%; } .tg-v2::before { left: -16%; bottom: -24%; width: 80%; border-radius: 50%; }
.tg-v3::before { right: -26%; bottom: -26%; width: 76%; border-radius: 34%; transform: rotate(18deg); } .tg-v4::before { left: -22%; top: -22%; width: 66%; border-radius: 50%; }
.tg-vlak svg { position: relative; width: 58%; height: auto; }
/* oudere Safari (iPadOS 14 en ouder) kent aspect-ratio niet: dan houdt een leeg vlakje met padding de tegel en de rondjes vierkant */
@supports not (aspect-ratio: 1 / 1) {
  .tg-vlak::after { content: ''; padding-top: 100%; grid-area: 1 / 1; }
  .tg-vlak > svg { grid-area: 1 / 1; }
  .tg-v1::before { height: 72%; } .tg-v2::before { height: 80%; } .tg-v3::before { height: 76%; } .tg-v4::before { height: 66%; }
}
.tg-tegel:hover .tg-vlak, .tg-tegel:focus-visible .tg-vlak { transform: translateY(-6px) rotate(-1.5deg); box-shadow: var(--tg-zweef); }
.tg-tegel:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 6px; border-radius: 1.5rem; }
.tg-nieuw { position: absolute; top: 10px; right: 10px; background: #C8323C; color: #FFFFFF; font-weight: 800; font-size: .75rem; padding: 4px 9px; border-radius: 999px; transform: rotate(6deg); }
.tg-naam { font-weight: 800; font-size: 1.1rem; line-height: 1.15; }
.tg-zin { font-size: .875rem; line-height: 1.35; color: var(--tg-zacht); margin-top: -.25rem; }
.tg-voortgang { display: flex; flex-direction: column; gap: .25rem; font-size: .78rem; font-weight: 700; color: var(--tg-zacht); }
.tg-voortgang i { display: block; height: .35rem; border-radius: 999px; background: rgba(127,115,100,.25); overflow: hidden; } .tg-voortgang em { display: block; height: 100%; background: #C8323C; border-radius: 999px; }
.tg-dag { margin: .4rem 0 2.8rem; }
.tg-dag-kop { display: flex; align-items: center; flex-wrap: wrap; gap: .9rem 1.2rem; margin: 0 0 1.3rem; }
.tg-blad { position: relative; flex: none; width: 4.3rem; border: 3px solid var(--tg-rand); border-radius: .9rem; background: #FFFFFF; color: #231A26; text-align: center; box-shadow: 0 4px 0 rgba(35,26,38,.18); transform: rotate(-3deg); }
.tg-blad::before { content: ''; display: block; height: 1.1rem; background: #C8323C; border-bottom: 3px solid #231A26; border-radius: .6rem .6rem 0 0; }
.tg-blad i { position: absolute; top: .3rem; width: .5rem; height: .5rem; border-radius: 50%; background: #FBF6E9; border: 2px solid #231A26; } .tg-blad i:first-of-type { left: 22%; } .tg-blad i:last-of-type { right: 22%; }
.tg-blad b { display: block; font-size: 1.85rem; line-height: 1; margin-top: .3rem; }
.tg-blad span { display: block; font-size: .7rem; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; margin: .15rem 0 .4rem; }
.tg-blad .tg-blad-klaar { position: absolute; right: -.7rem; bottom: -.6rem; display: grid; place-items: center; width: 1.75rem; height: 1.75rem; margin: 0; border-radius: 50%; border: 2.5px solid #231A26; background: #23704F; color: #FFFFFF; font-size: .95rem; line-height: 1; letter-spacing: 0; transform: rotate(10deg); }
.tg-dag-tekst { flex: 1 1 15rem; min-width: 0; }
.tg-dag-tekst h2 { margin: 0 0 .45rem; }
.tg-dag-tekst p { margin: 0; color: var(--tg-zacht); font-size: .95rem; line-height: 1.4; }
.tg-dag-teller { flex: none; display: flex; flex-direction: column; align-items: flex-end; gap: .35rem; font-weight: 800; font-size: .92rem; }
.tg-stipjes { display: flex; gap: 5px; }
.tg-stipjes i { width: 1.5rem; height: .6rem; border-radius: 999px; border: 2px solid var(--tg-knop-rand); }
.tg-stipjes i.aan { background: #23704F; border-color: #23704F; }
html[data-thema="donker"] .tg-stipjes i.aan { background: #7FD3A8; border-color: #7FD3A8; }
.tg-dag-klok { font-weight: 700; font-size: .82rem; color: var(--tg-zacht); }
.tg-dag-rij { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
.tg-dk { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: .5rem; min-width: 0; padding: 1rem 1rem 1.05rem; border-radius: 1.3rem; border: 3px solid var(--tg-rand); background: var(--tg-knop); color: var(--tg-tekst); text-decoration: none; box-shadow: 0 5px 0 rgba(35,26,38,.15); }
html[data-thema="donker"] .tg-dk { box-shadow: var(--tg-schaduw); }
.tg-dk:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 3px; }
.tg-dk-ico { display: grid; place-items: center; width: 3.3rem; height: 3.3rem; border-radius: .95rem; border: 2.5px solid var(--tg-rand); }
.tg-dk-ico svg { width: 80%; height: auto; }
.tg-dk-naam { font-weight: 800; font-size: 1.05rem; line-height: 1.15; overflow-wrap: break-word; hyphens: manual; }
.tg-dk-wat { font-size: .85rem; line-height: 1.3; color: var(--tg-zacht); margin-top: -.3rem; }
.tg-dk-ws { display: grid; grid-template-columns: minmax(0, 1fr); gap: .05rem; font-size: .8rem; line-height: 1.3; color: var(--tg-zacht); width: 100%; margin-top: -.2rem; }
.tg-dk-ws span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tg-dk-ws b { display: inline-block; width: 1.3em; font-size: 1.05em; color: var(--tg-tekst); }
.tg-dk-ws .is-klaar { color: var(--tg-tekst); }
.tg-dk-pil { display: inline-flex; align-items: center; gap: .4rem; padding: .3rem .75rem; border-radius: 999px; background: #C8323C; color: #FFFFFF; font-weight: 800; font-size: .82rem; line-height: 1.25; }
.tg-dk-pil b { flex: none; width: .5rem; height: .5rem; border-radius: 50%; background: #FFFFFF; }
.tg-dk.is-bezig .tg-dk-pil { background: #E9B949; color: #231A26; } .tg-dk.is-bezig .tg-dk-pil b { background: #231A26; }
.tg-dk.is-klaar .tg-dk-pil { background: #23704F; } .tg-dk.is-mis .tg-dk-pil { background: #6B5E52; }
.tg-dk-reeks { display: flex; align-items: center; gap: .3rem; margin-top: auto; padding-top: .15rem; font-size: .8rem; font-weight: 700; line-height: 1.25; color: var(--tg-zacht); }
.tg-dk-reeks svg { flex: none; width: 1.05rem; height: 1.05rem; }
.tg-dk-reeks.gevaar { color: #A3401A; } html[data-thema="donker"] .tg-dk-reeks.gevaar { color: #FFB070; }
.tg-dk-stempel { position: absolute; top: .85rem; right: .75rem; padding: .12rem .4rem; border: 2.5px solid currentColor; border-radius: .4rem; color: #23704F; font-weight: 800; font-size: .7rem; letter-spacing: .06em; text-transform: uppercase; transform: rotate(8deg); }
html[data-thema="donker"] .tg-dk-stempel { color: #7FD3A8; }
.tg-dk.is-mis .tg-dk-stempel { color: #6B5E52; } html[data-thema="donker"] .tg-dk.is-mis .tg-dk-stempel { color: #CFC5B4; }
@media (prefers-reduced-motion: no-preference) {
  .tg-dk { transition: box-shadow .18s ease; } .tg-dk-ico { transition: transform .25s cubic-bezier(.3,1.6,.5,1); }
  .tg-dk:hover { box-shadow: var(--tg-zweef); } .tg-dk:hover .tg-dk-ico, .tg-dk:focus-visible .tg-dk-ico { transform: rotate(-7deg) scale(1.07); }
  .tg-dk.is-open .tg-dk-pil b { animation: tg-puls 1.6s ease-in-out infinite; }
}
@keyframes tg-puls { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,.85); } 60% { box-shadow: 0 0 0 6px rgba(255,255,255,0); } }
@media (max-width: 900px) { .tg-dag-rij { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 700px) {
  .tg-dag-kop { gap: .8rem 1rem; } .tg-dag-teller { flex: 1 1 100%; flex-direction: row; flex-wrap: wrap; align-items: center; gap: .3rem .6rem; } .tg-dag-tel, .tg-dag-klok { white-space: nowrap; } .tg-stipjes { order: -1; } .tg-dag-klok { margin-left: auto; }
  .tg-dag-rij { gap: .75rem; } .tg-dk { padding: .85rem .8rem .9rem; border-radius: 1.1rem; gap: .45rem; } .tg-dk-ico { width: 2.8rem; height: 2.8rem; }
  .tg-dk-naam { font-size: .98rem; } .tg-dk-stempel { top: .7rem; right: .55rem; font-size: .62rem; } .tg-dk-pil { padding: .28rem .6rem; font-size: .76rem; border-radius: .9rem; }
}
:root { --rm-potlood: rgba(52,48,60,.86); --rm-sch: rgba(35,26,38,.2); --rm-hout: #B9834F; --rm-hout-donker: #7A4E2D; }
html[data-thema="donker"] { --rm-potlood: rgba(240,234,222,.86); --rm-sch: rgba(255,240,200,.13); --rm-hout: #8E5E36; --rm-hout-donker: #4E321C; }
#rm-lijnen { position: absolute; left: 0; top: 0; pointer-events: none; z-index: 4; overflow: hidden; }
#rm-lijnen path { fill: none; stroke: var(--rm-potlood); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
#rm-lijnen path.vervaag { opacity: 0; transition: opacity 6s linear 3s; }
#rm-laag { position: absolute; left: 0; top: 0; width: 0; height: 0; z-index: 5; overflow: hidden; overflow: clip; pointer-events: none; }
.tg-rommel { position: absolute; left: -33px; top: -33px; width: 66px; height: 66px; padding: 0; margin: 0; border: 0; background: none; color: inherit; pointer-events: none; touch-action: none; -webkit-tap-highlight-color: transparent; will-change: transform; border-radius: 50%; }
.tg-rommel:focus { outline: none; }
.tg-rommel:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 0; }
.tg-rommel > span { position: absolute; left: 0; top: 0; width: 66px; height: 66px; will-change: transform; pointer-events: none; }
.tg-rommel svg { position: absolute; left: 7px; top: 7px; width: 52px; height: 52px; overflow: visible; }
.rm-sch svg * { fill: var(--rm-sch); stroke: none; }
.rm-sch svg [fill="none"] { fill: none; stroke: var(--rm-sch); }
.rm-draai .hit { fill: transparent; stroke: none; pointer-events: all; cursor: grab; }
.rm-draai .hit.grof { pointer-events: none; }
@media (pointer: coarse) { .rm-draai .hit.fijn { pointer-events: none; } .rm-draai .hit.grof { pointer-events: all; } }
.tg-rommel.vast .hit { cursor: grabbing; }
.rm-draai .tek, .rm-glans svg { pointer-events: none; }
.rm-plank { position: absolute; left: 0; top: 0; box-sizing: border-box; height: 12px; background: var(--rm-hout); border: 2.5px solid var(--tg-rand); border-radius: 3px; box-shadow: 0 4px 0 var(--rm-hout-donker); pointer-events: none; }
.rm-plank::before, .rm-plank::after { content: ''; position: absolute; top: 9px; width: 8px; height: 14px; box-sizing: border-box; background: var(--rm-hout-donker); border: 2px solid var(--tg-rand); border-radius: 0 0 3px 3px; }
.rm-plank::before { left: 10px; } .rm-plank::after { right: 10px; }
.rm-plank i { position: absolute; top: -12.5px; width: 7px; height: 12px; box-sizing: border-box; background: var(--rm-hout); border: 2.5px solid var(--tg-rand); border-bottom: 0; border-radius: 3px 3px 0 0; }
.rm-plank i.l { left: -5px; } .rm-plank i.r { right: -5px; }
.rm-bel { position: absolute; left: 0; top: 0; z-index: 6; pointer-events: none; background: #23252B; color: #FBF6E9; font-weight: 800; font-size: .95rem; padding: 3px 10px 4px; border-radius: 999px; white-space: nowrap; }
/* de rommelkast met knipoogjes (hebbedingetjes uit series en films, eigen tekeningen) */
:root { --rm-sch-k: #231A26; --rm-sch-a: .2; --rm-kast-achter: #EAD5AA; --rm-kast-gaatje: rgba(122,78,45,.34); --rm-stof: #8A7E70; }
html[data-thema="donker"] { --rm-sch-k: #FFF0C8; --rm-sch-a: .13; --rm-kast-achter: #3A2E24; --rm-kast-gaatje: rgba(0,0,0,.4); --rm-stof: #CFC5B4; }
.rm-sch.rm-vol svg { opacity: var(--rm-sch-a); }
.rm-sch.rm-vol svg * { fill: var(--rm-sch-k); stroke: none; }
.rm-sch.rm-vol svg [fill="none"] { fill: none; stroke: var(--rm-sch-k); }
.rm-sch .rm-gloed { display: none; }
.rm-knipoog .rm-draai svg { transform-origin: 50% 88%; }
.rm-knipoog .rm-steen { transform-box: fill-box; transform-origin: 50% 50%; }
.rm-knipoog .rm-wip { transform-box: fill-box; transform-origin: 50% 100%; }
.rm-knipoog .rm-links, .rm-knipoog .rm-rechts { transform-origin: 32px 41px; }
.tg-rommel[data-rommel="vingerval"] .tek { transform-origin: 32px 44px; }
.tg-kast { margin: 0 0 2.6rem; padding-top: 24px; }
.rm-kast { position: relative; margin: 0 auto; box-sizing: border-box; pointer-events: none; }
.rm-kast.rm-zij { position: absolute; left: 0; top: 0; margin: 0; z-index: 2; }
.rm-kast > span { position: absolute; display: block; box-sizing: border-box; }
.rm-kast-kast { left: 0; right: 0; top: 12px; bottom: 8px; background: var(--rm-hout); border: 3px solid var(--tg-rand); border-radius: 4px; box-shadow: 5px 6px 0 var(--rm-sch); }
.rm-kast-achter { left: 13px; right: 13px; top: 20px; bottom: 18px; background: var(--rm-kast-achter) radial-gradient(circle, var(--rm-kast-gaatje) 1.6px, transparent 2.1px) 7px 7px / 14px 14px; box-shadow: inset 0 0 0 2px var(--tg-rand), inset 5px 7px 0 rgba(35,26,38,.13); }
.rm-kast-plank { left: 11px; right: 11px; height: 10px; background: var(--rm-hout); border: 2.5px solid var(--tg-rand); border-radius: 2px; box-shadow: 0 5px 0 rgba(35,26,38,.15); }
.rm-kast-kroon { left: -6px; right: -6px; top: 0; height: 14px; background: var(--rm-hout); border: 3px solid var(--tg-rand); border-radius: 4px 4px 2px 2px; box-shadow: inset 0 3px 0 rgba(255,255,255,.18), 0 3px 0 var(--rm-hout-donker); }
.rm-kast-voet { bottom: 0; width: 16px; height: 12px; background: var(--rm-hout-donker); border: 2.5px solid var(--tg-rand); border-top: 0; border-radius: 0 0 4px 4px; }
.rm-kast-voet.l { left: 10px; } .rm-kast-voet.r { right: 10px; }
.rm-kast-tape { left: 50%; top: -21px; transform: translateX(-50%) rotate(-3deg); background: #23252B; color: #F4F1EC; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; font-size: 12.5px; line-height: 1; padding: 5px 10px 4px; border-radius: 3px; white-space: nowrap; font-stretch: 75%; box-shadow: 0 2px 0 rgba(0,0,0,.18); }
.rm-kaart { position: absolute; left: 0; top: 0; z-index: 7; max-width: 220px; box-sizing: border-box; padding: 8px 11px 9px; background: var(--tg-knop); color: var(--tg-tekst); border: 2.5px solid var(--tg-knop-rand); border-radius: 10px; box-shadow: 3px 4px 0 rgba(35,26,38,.18); pointer-events: none; opacity: 0; transition: opacity .15s ease; line-height: 1.25; text-align: left; }
.rm-kaart.zichtbaar { opacity: 1; }
.rm-kaart b { display: block; font-weight: 800; font-size: .95rem; }
.rm-kaart .rm-serie { display: inline-block; margin: 3px 0 4px; padding: 1px 7px 2px; border-radius: 999px; background: #23252B; color: #FBF6E9; font-size: .72rem; font-weight: 800; letter-spacing: .02em; }
html[data-thema="donker"] .rm-kaart .rm-serie { background: #FFE76A; color: #231A26; }
.rm-kaart .rm-zin { display: block; font-size: .85rem; }
.rm-flits { position: absolute; left: 0; top: 0; border-radius: 50%; pointer-events: none; z-index: 6; opacity: 0; }
.rm-bliksem { position: absolute; left: 0; top: 0; width: 40px; height: 80px; pointer-events: none; z-index: 6; opacity: 0; }
.rm-bliksem svg { display: block; width: 100%; height: 100%; fill: #FFE76A; stroke: #231A26; stroke-width: 2.5; stroke-linejoin: round; }
.rm-vuur { position: absolute; width: 150px; height: 4px; border-radius: 3px; background: linear-gradient(90deg, #FFF3A8, #F08A2C 45%, rgba(200,50,60,0)); pointer-events: none; z-index: 4; transform-origin: 0 50%; opacity: 0; }
.rm-vuur.links { background: linear-gradient(270deg, #FFF3A8, #F08A2C 45%, rgba(200,50,60,0)); transform-origin: 100% 50%; }
.rm-deeltje { position: absolute; left: 0; top: 0; width: 14px; height: 14px; pointer-events: none; z-index: 6; }
.rm-deeltje svg { display: block; width: 100%; height: 100%; }
.rm-stof i { display: block; width: 5px; height: 5px; border-radius: 50%; background: var(--rm-stof); }
@media (prefers-reduced-motion: reduce) { .rm-kaart { transition: none; } }
@media (max-width: 420px) { .tg-rommelknop .tg-rk-kantel { padding: 0; } .tg-rommelknop .tg-rk-kantel span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; } }
.rm-toast { position: fixed; left: 50%; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); transform: translate(-50%, 180%); background: #23252B; color: #FBF6E9; font-weight: 700; padding: 10px 18px; border-radius: 999px; z-index: 60; max-width: calc(100vw - 32px); box-sizing: border-box; text-align: center; transition: transform .25s ease; pointer-events: none; }
.rm-toast.zichtbaar { transform: translate(-50%, 0); }
html[data-thema="donker"] .rm-bel, html[data-thema="donker"] .rm-toast { background: #FBF6E9; color: #231A26; }
.rm-weg { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.rm-debug { position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 59; }
.rm-debuglabel { position: fixed; left: 12px; bottom: calc(12px + env(safe-area-inset-bottom, 0px)); z-index: 59; pointer-events: none; font: 700 12px/1.3 ui-monospace, Menlo, monospace; background: rgba(35,26,38,.88); color: #FBF6E9; padding: 4px 8px; border-radius: 6px; }
.tg-rommelplek { align-self: end; justify-self: start; display: flex; min-width: 0; }
.tg-rommelknop { flex: none; display: flex; gap: 4px; padding: 4px; border-radius: 999px; background: var(--tg-knop); border: 2.5px solid var(--tg-knop-rand); box-shadow: 0 3px 0 rgba(0,0,0,.2); }
.tg-rommelknop button { display: flex; align-items: center; justify-content: center; gap: 7px; min-height: 44px; min-width: 44px; padding: 0 12px; border-radius: 999px; border: 0; background: transparent; color: var(--tg-knop-tekst); font: inherit; font-weight: 800; font-size: .88rem; cursor: pointer; }
.tg-rommelknop .tg-rk-geluid, .tg-rommelknop .tg-rk-terug { padding: 0; }
.tg-rommelknop .tg-rk-kantel[aria-pressed="true"] { background: var(--tg-actief); color: var(--tg-actief-tekst); }
.tg-rommelknop svg { width: 18px; height: 18px; flex: none; }
.tg-rk-geluid[aria-pressed="true"] .rk-stil, .tg-rk-geluid[aria-pressed="false"] .rk-golf { display: none; }
.tg-rommelknop button:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .rm-toast { transition: none; } #rm-lijnen path.vervaag { transition: opacity 3s linear 4s; } .tg-rommel.hup .rm-draai { animation: rm-tik .3s ease; } }
@keyframes rm-tik { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }
@media (max-width: 700px) {
  .tg-balk { flex-direction: column; gap: .8rem; display: grid; grid-template-columns: minmax(0, 1fr) auto; } .tg-rommelknop { grid-row: 1; grid-column: 1; justify-self: start; } .tg-balk .tg-weergave { grid-row: 1; grid-column: 2; } .tg-balk .tg-filters { grid-row: 2; grid-column: 1 / -1; min-width: 0; } .tg-weergave { order: -1; align-self: flex-end; } .tg-weergave button { padding: 0 12px; } .tg-weergave .tg-woord { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .tg-filters { flex-wrap: nowrap; overflow-x: auto; padding-bottom: .3rem; scrollbar-width: none; } .tg-filters::-webkit-scrollbar { display: none; }
  .tg-raster { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.6rem 1rem; } .tg-vlak { border-radius: 1.25rem; } .tg-naam { font-size: 1rem; }
}
@media (prefers-reduced-motion: reduce) { .tg-vlak, body.v6-body { transition: none; } .tg-tegel:hover .tg-vlak { transform: none; } }
/* nep-reclame voor de spellen (banners.js): een advertentie tussen Puzzels van vandaag en Alle spellen, en een hoge in de rechter kantlijn */
.tg-reclame { display: block; margin: 0 0 2.6rem; }
.tg-reclame-hoog, .tg-reclame-hoog.ra-plek { position: absolute; left: 0; top: 0; width: 160px; z-index: 2; }
@media (max-width: 640px) { .tg-reclame { margin-bottom: 2rem; } }
/* het casino: een uithangbord met neon en lampjes (bovenaan, zolang er een kaartje voor rommelcasino.html is) */
.tg-casino { margin: 0 0 2.6rem; }
.tg-cas-bord { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "tekst plaat" "knop plaat"; align-items: center; gap: .7rem 1.6rem; padding: 2.2rem 2.1rem 2.1rem; border-radius: 1.75rem; border: 3px solid var(--tg-rand); text-decoration: none; color: #FFF4DA; overflow: hidden; background: radial-gradient(120% 150% at 88% 18%, #9A2079 0%, #4E1463 40%, #1C0B36 80%) #1C0B36; box-shadow: inset 0 0 0 3px #E9B949, inset 0 0 0 7px rgba(28,11,54,.85), inset 0 0 0 8.5px rgba(233,185,73,.5); }
.tg-cas-bord::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 18% 115%, rgba(255,80,190,.3), transparent 48%), radial-gradient(circle at 8% 22%, rgba(255,255,255,.55) 0 1.2px, transparent 1.6px), radial-gradient(circle at 31% 12%, rgba(255,255,255,.4) 0 1px, transparent 1.4px), radial-gradient(circle at 47% 30%, rgba(255,255,255,.35) 0 1.2px, transparent 1.6px), radial-gradient(circle at 63% 14%, rgba(255,255,255,.5) 0 1px, transparent 1.4px); }
.tg-cas-lamp { position: absolute; left: 1.3rem; right: 1.3rem; display: flex; justify-content: space-between; pointer-events: none; z-index: 1; }
.tg-cas-lamp.boven { top: .6rem; } .tg-cas-lamp.onder { bottom: .6rem; }
.tg-cas-lamp i { width: 8px; height: 8px; border-radius: 50%; background: #FFE9A8; box-shadow: 0 0 6px 2px rgba(255,214,110,.7); }
.tg-cas-tekst { grid-area: tekst; position: relative; z-index: 1; min-width: 0; }
.tg-cas-label { display: inline-block; font-size: .78rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #2A1300; background: linear-gradient(180deg, #FFF0B8, #F4C752 55%, #D99A22); border-radius: 999px; padding: .2rem .75rem; }
.tg-cas-neon { margin: .5rem 0 .4rem; font-size: clamp(1.85rem, 5.4vw, 3.2rem); font-weight: 800; line-height: 1.02; color: #FFF0F8; text-shadow: 0 0 4px #FFB6E6, 0 0 12px #FF4FB8, 0 0 30px rgba(255,63,160,.75); overflow-wrap: anywhere; }
.tg-cas-zin { display: block; font-size: 1.02rem; line-height: 1.45; color: #F1E4FF; max-width: 35rem; }
.tg-cas-status { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .75rem; }
.tg-cas-status span { font-size: .82rem; font-weight: 800; color: #FFE9A8; background: rgba(255,255,255,.08); border: 1.5px solid rgba(233,185,73,.55); border-radius: 999px; padding: .2rem .65rem; }
.tg-cas-knop { grid-area: knop; justify-self: start; position: relative; z-index: 1; white-space: nowrap; font-weight: 800; font-size: 1.05rem; color: #3A2300; background: linear-gradient(180deg, #FFF0B8 0%, #F4C752 45%, #D99A22 100%); border-radius: 999px; padding: .72rem 1.45rem; box-shadow: inset 0 1px 0 rgba(255,255,255,.75), 0 0 0 2px #8A5A12, 0 10px 22px -10px rgba(217,154,34,.9); }
.tg-cas-bord:hover .tg-cas-knop, .tg-cas-bord:focus-visible .tg-cas-knop { background: linear-gradient(180deg, #FFF8DC, #FFD45C 50%, #EBAA2C); }
.tg-cas-bord:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 4px; }
.tg-cas-plaat { grid-area: plaat; position: relative; z-index: 1; width: clamp(10rem, 25vw, 16rem); }
.tg-cas-plaat svg { display: block; width: 100%; height: auto; overflow: visible; }
@media (max-width: 640px) {
  .tg-casino { margin-bottom: 2rem; }
  .tg-cas-bord { grid-template-columns: minmax(0, 1fr) 6.6rem; grid-template-areas: "tekst tekst" "knop plaat"; padding: 1.8rem 1.25rem 1.6rem; gap: .9rem .6rem; }
  .tg-cas-plaat { width: 6.6rem; align-self: end; margin: -1.6rem -.3rem -.4rem 0; }
  .tg-cas-zin { font-size: .94rem; } .tg-cas-lamp { left: 1rem; right: 1rem; }
}
@media (max-width: 400px) { .tg-cas-bord { grid-template-columns: minmax(0, 1fr) 5.6rem; } .tg-cas-plaat { width: 5.6rem; } .tg-cas-knop { font-size: .98rem; padding: .66rem 1.05rem; } }
@media (prefers-reduced-motion: no-preference) {
  .tg-cas-lamp i { animation: tg-lamp 1.3s steps(1) infinite; } .tg-cas-lamp i:nth-child(2n) { animation-delay: -.65s; }
  .tg-cas-neon { animation: tg-neon 8s linear infinite; }
  .tg-cas-wiel { animation: tg-wiel 16s linear infinite; transform-origin: 138px 66px; transform-box: view-box; }
}
@keyframes tg-lamp { 0% { opacity: 1; } 50% { opacity: .25; } }
@keyframes tg-neon { 0%, 60%, 62.5%, 65%, 100% { opacity: 1; } 61%, 64% { opacity: .55; } }
@keyframes tg-wiel { to { transform: rotate(360deg); } }
`;

  // ================= de puzzels van vandaag: elke dag nieuw, met je reeks
  // Elk spel bewaart zijn dag op zijn eigen manier; hier staat per spel hoe je dat leest (zie ook VOORTGANG in home_v8).
  const lees = k => { try { const t = localStorage.getItem(k); return t ? JSON.parse(t) : null; } catch (e) { return null; } };
  const twee = n => String(n).padStart(2, '0');
  const isoVan = d => d.getFullYear() + '-' + twee(d.getMonth() + 1) + '-' + twee(d.getDate());
  const lokaal = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);   // dagnummer volgens de klok van het apparaat, zoals Rommelwoord, Op Gevoel en Rommelkroon
  const nlDag = () => { try { const m = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/); return Math.round(Date.UTC(+m[1], m[2] - 1, +m[3]) / 864e5); } catch (e) { return lokaal(); } };   // Rommelgroepjes rekent in Nederlandse tijd
  const fouten = f => f + (f === 1 ? ' fout' : ' fouten');
  // de vier woordspellen samen (zie WS in de pagina's): ✓ gedaan, ◐ bezig, ○ open, en de woordreeks (elke dag minstens één gespeeld)
  const WOORD_START = 30;
  function woordspellen(d, s5, st) {
    const x = lees('rommelwoord-extra-v1') || {}, xd = x.d && typeof x.d === 'object' ? x.d : {}, u = [];
    const merk = v => { if (typeof v === 'string') for (let k = 0; k < v.length; k++) if (v[k] !== '.') u[k] = 1; };
    [4, 5, 6, 7, 8].forEach(n => merk(xd[n]));
    if (typeof xd[5] !== 'string') { const lw = +st.laatsteWinst, rk = +st.reeks || 0; if (rk > 0 && lw >= 0) for (let k = Math.max(0, lw - rk + 1); k <= lw; k++) u[k] = 1; }
    if (s5.klaar && s5.dag >= 0) u[s5.dag] = 1;
    const SP = [['Woord', 'rommelwoord.html', null], ['Cryptisch', 'cryptisch.html', 'cryptisch-v1'], ['Letterval', 'letterval.html', 'letterval-v1'], ['Klinkermijnen', 'klinkermijnen.html', 'klinkermijnen-v1']];
    const stand = SP.map(sp => {
      if (!sp[2]) return s5.dag === d ? (s5.klaar ? 'klaar' : (s5.pogingen || []).length ? 'bezig' : 'open') : 'open';
      const v = lees(sp[2]) || {}; merk(v.d); return typeof v.d === 'string' && v.d[d] && v.d[d] !== '.' ? 'klaar' : v.bezig && v.bezig.dag === d ? 'bezig' : 'open';
    });
    let reeks = 0; for (let k = u[d] ? d : d - 1; k >= 0 && u[k]; k--) reeks++;
    const af = stand.filter(z => z === 'klaar').length, eerst = stand.indexOf('bezig') >= 0 ? stand.indexOf('bezig') : stand.indexOf('open');
    const TEKEN = { klaar: '✓', bezig: '◐', open: '○' }, ZEG = { klaar: 'gedaan', bezig: 'bezig', open: 'nog niet gespeeld' };
    const lijst = '<span class="tg-dk-ws">' + SP.map((sp, i) => '<span class="is-' + stand[i] + '"><b>' + TEKEN[stand[i]] + '</b>' + sp[0] + '</span>').join('') + '</span>';
    return { naam: 'Woordspellen', href: SP[eerst >= 0 ? eerst : 0][1], stand: af === 4 ? 'klaar' : af || stand.indexOf('bezig') >= 0 ? 'bezig' : 'open', wat: af + ' van 4 gedaan', uitslag: 'Alle vier gedaan', reeks, extra: lijst,
      zeg: SP.map((sp, i) => sp[0] + ' ' + ZEG[stand[i]]).join(', ') };
  }
  const DAGSPEL = {
    'rommelwoord.html': () => {
      const d = lokaal() - Date.UTC(2026, 9, 8) / 864e5, s = lees('rommelwoord-dag-v1') || {}, st = lees('rommelwoord-stats-v1') || {};
      if (d >= WOORD_START) return woordspellen(d, s, st);
      const hier = s.dag === d, n = hier && Array.isArray(s.pogingen) ? s.pogingen.length : 0, reeks = +st.laatsteWinst >= d - 1 ? +st.reeks || 0 : 0, wat = 'Woord ' + (d + 1);
      if (hier && s.klaar) return s.gewonnen ? { stand: 'klaar', wat, uitslag: 'Geraden in ' + n, reeks } : { stand: 'mis', wat, uitslag: 'Niet geraden', reeks: 0 };
      return { stand: n ? 'bezig' : 'open', wat: n ? 'Poging ' + (n + 1) + ' van 6' : wat, reeks };
    },
    'rommelgroepjes.html': () => {
      const n = nlDag() - Date.UTC(2026, 9, 29) / 864e5 + 1, s = lees('rommelgroepjes-v1') || {}, p = s.p && typeof s.p === 'object' ? s.p : {}, x = String(p[n] || ''), f = +x[1] || 0, wat = 'Puzzel ' + n;
      let reeks = 0; if (x[0] !== 'v') for (let d = x[0] === 'w' ? n : n - 1; d > 0 && String(p[d] || '')[0] === 'w'; d--) reeks++;
      if (x[0] === 'w') return { stand: 'klaar', wat, uitslag: f ? 'Opgelost, ' + fouten(f) : 'Opgelost zonder fouten', reeks };
      if (x[0] === 'v') return { stand: 'mis', wat, uitslag: 'Niet gelukt', reeks: 0 };
      return { stand: x[0] === 'b' ? 'bezig' : 'open', wat: x[0] === 'b' && f ? wat + ' · ' + fouten(f) : wat, reeks };
    },
    'opgevoel.html': () => {
      const s = lees('opgevoel-v1') || {}, nu = new Date(), k = isoVan(nu), g = new Date(nu); g.setDate(g.getDate() - 1);
      const r = s.reeks || {}, reeks = r.laatste === k || r.laatste === isoVan(g) ? +r.lengte || 0 : 0, v = s.dagen && s.dagen[k], b = s.bezig && s.bezig.dag === k && Array.isArray(s.bezig.s) ? s.bezig.s.length : 0;
      if (v) return { stand: 'klaar', wat: 'Vijf uitdagingen', uitslag: (+v.t || 0) + ' van 500 punten', reeks };
      return { stand: b ? 'bezig' : 'open', wat: b ? b + ' van 5 uitdagingen gedaan' : 'Vijf uitdagingen', reeks };
    },
    'rommelkroon.html': () => {
      const d = lokaal(), s = lees('rommelkroon-v1') || {}, dag = s.dag && typeof s.dag === 'object' ? s.dag : {}, m = [10, 7, 7, 8, 8, 9, 9][(d + 4) % 7], wat = 'Een ' + m + '×' + m + ' kroontjespuzzel';
      const op = x => Array.isArray(dag[x]) && !!dag[x][2]; let reeks = 0; for (let x = op(d) ? d : d - 1; op(x); x--) reeks++;
      if (Array.isArray(dag[d])) { const t = +dag[d][0] || 0; return { stand: 'klaar', wat, uitslag: 'Opgelost in ' + Math.floor(t / 60) + ':' + twee(Math.floor(t % 60)), reeks }; }
      return { stand: s.bezig && s.bezig['d' + d] ? 'bezig' : 'open', wat, reeks };
    },
  };
  const VLAM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.8 3.3 4.8 5.6 4.8 10.4a4.8 4.8 0 0 1-9.6 0c0-2.6 1.4-4 2.2-6 .9 1.3 1.6 2.6 1.6 4 1.3-1.6 1.6-4.4 1-8.4z" fill="#F08A24" stroke="#231A26" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 13.2c.6 1.2 2 2 2 3.6a2 2 0 0 1-4 0c0-1.2.9-1.8 2-3.6z" fill="#FFE76A"/></svg>';
  const dagen = n => n + (n === 1 ? ' dag' : ' dagen');
  function maakDag(tegels, blok) {
    const spellen = Object.keys(DAGSPEL).map(href => ({ href, i: tegels.findIndex(t => t.href === href) })).filter(x => x.i >= 0).map(x => Object.assign({ kleur: KLEUREN[x.i % KLEUREN.length] }, tegels[x.i]));
    if (!spellen.length) return;
    const sec = document.createElement('section'); sec.className = 'tg-dag'; sec.id = 'vandaag'; sec.setAttribute('aria-labelledby', 'tg-dag-kop');
    sec.innerHTML = `<div class="tg-dag-kop"><div class="tg-blad" aria-hidden="true"><i></i><i></i><b></b><span></span></div>
        <div class="tg-dag-tekst"><h2 id="tg-dag-kop"><span>Puzzels van vandaag</span></h2><p></p></div>
        <div class="tg-dag-teller"><span class="tg-dag-tel"></span><span class="tg-stipjes" aria-hidden="true"></span><span class="tg-dag-klok"></span></div></div>
      <div class="tg-dag-rij"></div>`;
    blok.before(sec);
    const rij = sec.querySelector('.tg-dag-rij'); let vorige = '', dagNu = -1;
    const kaart = (sp, s) => {
      const pil = s.stand === 'open' ? '<b></b>Speel nu' : s.stand === 'bezig' ? '<b></b>Ga verder' : veilig(s.uitslag);
      const gevaar = s.reeks > 0 && (s.stand === 'open' || s.stand === 'bezig');
      const reeks = s.stand === 'mis' ? 'Morgen een nieuwe kans' : s.reeks > 0 ? (gevaar ? 'Reeks van ' + dagen(s.reeks) + ': speel vandaag!' : dagen(s.reeks) + ' op rij') : 'Begin vandaag een reeks';
      const naam = s.naam || sp.naam, zeg = naam + ', ' + s.wat + ': ' + (s.zeg || (s.stand === 'open' ? 'nog niet gespeeld' : s.stand === 'bezig' ? 'je bent bezig' : s.uitslag)) + '. ' + reeks + '.';
      return `<a class="tg-dk is-${s.stand}" href="${veilig(s.href || sp.href)}" aria-label="${veilig(zeg)}">
        <span class="tg-dk-ico" style="background:${sp.kleur}" aria-hidden="true">${sp.icoon}</span>
        <span class="tg-dk-naam" aria-hidden="true">${veilig(naam).replace(/^Rommel(?=\S{5})/, 'Rommel\u00AD')}</span><span class="tg-dk-wat" aria-hidden="true">${veilig(s.wat)}</span>${s.extra || ''}
        <span class="tg-dk-pil" aria-hidden="true">${pil}</span>
        <span class="tg-dk-reeks${gevaar ? ' gevaar' : ''}" aria-hidden="true">${s.reeks > 0 ? VLAM : ''}${veilig(reeks)}</span>
        ${s.stand === 'klaar' || s.stand === 'mis' ? `<span class="tg-dk-stempel" aria-hidden="true">${s.stand === 'klaar' ? 'Gedaan' : 'Gespeeld'}</span>` : ''}
      </a>`;
    };
    const klok = () => {
      const nu = new Date(), m = new Date(nu); m.setHours(24, 0, 0, 0); const min = Math.floor((m - nu) / 60000), u = Math.floor(min / 60);
      sec.querySelector('.tg-dag-klok').textContent = 'Nieuwe puzzels over ' + (min < 1 ? 'een paar tellen' : u ? u + ' u ' + (min % 60) + ' min' : min + ' min');
    };
    function vernieuw() {
      const st = spellen.map(sp => { try { return DAGSPEL[sp.href](); } catch (e) { return { stand: 'open', wat: '', reeks: 0 }; } });
      const sleutel = JSON.stringify(st);
      if (sleutel !== vorige) {   // alleen opnieuw tekenen als er iets veranderde (anders raakt het toetsenbord zijn plek kwijt)
        vorige = sleutel; rij.innerHTML = spellen.map((sp, i) => kaart(sp, st[i])).join('');
        const gedaan = st.filter(s => s.stand === 'klaar' || s.stand === 'mis').length, alles = gedaan === st.length;
        sec.querySelector('.tg-dag-tel').textContent = gedaan + ' van ' + st.length + ' gedaan';
        sec.querySelector('.tg-stipjes').innerHTML = st.map((s, i) => `<i class="${i < gedaan ? 'aan' : ''}"></i>`).join('');
        sec.querySelector('.tg-dag-tekst p').textContent = alles ? 'Alles gedaan voor vandaag, goed bezig! Morgen om middernacht liggen er nieuwe puzzels klaar.' : 'Elke nacht om 12 uur liggen er nieuwe puzzels klaar, voor iedereen dezelfde. Speel ze elke dag en bouw je reeks op.';
        const blad = sec.querySelector('.tg-blad'), oud = blad.querySelector('.tg-blad-klaar'); if (oud) oud.remove();
        if (alles) { const k = document.createElement('span'); k.className = 'tg-blad-klaar'; k.textContent = '✓'; blad.appendChild(k); }
      }
      const d = lokaal(); if (d !== dagNu) { dagNu = d; const nu = new Date(); sec.querySelector('.tg-blad b').textContent = nu.getDate(); sec.querySelector('.tg-blad span').textContent = nu.toLocaleDateString('nl-NL', { month: 'short' }).replace('.', ''); }
      klok();
    }
    vernieuw();
    setInterval(vernieuw, 20000);
    addEventListener('pageshow', vernieuw); addEventListener('focus', vernieuw); addEventListener('storage', vernieuw); addEventListener('rommelhoekje-bijgewerkt', vernieuw);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) vernieuw(); });
  }

  // ================= het casino: een uithangbord bovenaan (alleen als er een kaartje voor rommelcasino.html op de homepage staat)
  function casinoPlaat() {
    let s = '<svg viewBox="0 0 200 150" aria-hidden="true" focusable="false"><g class="tg-cas-wiel"><circle cx="138" cy="66" r="58" fill="#E9B949" stroke="#6B4210" stroke-width="2.5"/><circle cx="138" cy="66" r="51" fill="#5A2A14"/>';
    for (let k = 0; k < 19; k++) { const a0 = k / 19 * Math.PI * 2, a1 = (k + 1) / 19 * Math.PI * 2, p = (r, a) => (138 + Math.cos(a) * r).toFixed(1) + ' ' + (66 + Math.sin(a) * r).toFixed(1); s += '<path d="M' + p(49, a0) + ' A49 49 0 0 1 ' + p(49, a1) + ' L' + p(33, a1) + ' A33 33 0 0 0 ' + p(33, a0) + 'Z" fill="' + (k === 0 ? '#138A4A' : k % 2 ? '#B3122E' : '#1D1A24') + '" stroke="#E9C46A" stroke-width=".8"/>'; }
    s += '<circle cx="138" cy="66" r="31" fill="#7A3E1E" stroke="#E9B949" stroke-width="1.5"/><path d="M138 50v32M122 66h32" stroke="#F4C752" stroke-width="4" stroke-linecap="round"/><circle cx="138" cy="66" r="6" fill="#F4C752"/></g>';
    s += '<circle cx="138" cy="15.5" r="4.2" fill="#FFFFFF" stroke="#9C9384" stroke-width="1"/>';
    // twee kaarten en een stapel fiches
    s += '<g transform="rotate(-15 52 98)"><rect x="30" y="66" width="44" height="62" rx="5" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><text x="36" y="81" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="13" fill="#1F2333">A</text><path d="M52 88c-6 6-12 9-12 14a5 5 0 0 0 9 3l-2 6h10l-2-6a5 5 0 0 0 9-3c0-5-6-8-12-14z" fill="#1F2333"/></g>';
    s += '<g transform="rotate(9 74 102)"><rect x="52" y="70" width="44" height="62" rx="5" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><text x="58" y="85" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="13" fill="#C8323C">H</text><path d="M74 118c-9-5.5-13-10-13-14.5a6.5 6.5 0 0 1 13-1.6 6.5 6.5 0 0 1 13 1.6c0 4.5-4 9-13 14.5z" fill="#C8323C"/></g>';
    [['#C8323C', 0], ['#2F4C8F', 1], ['#23865A', 2], ['#E5A425', 3]].forEach(([k, i]) => { const y = 136 - i * 7; s += '<ellipse cx="118" cy="' + (y + 3) + '" rx="20" ry="7" fill="#231A26"/><ellipse cx="118" cy="' + y + '" rx="20" ry="7" fill="' + k + '" stroke="#231A26" stroke-width="1.6"/><ellipse cx="118" cy="' + y + '" rx="12" ry="4" fill="none" stroke="#FBF6E9" stroke-width="2" stroke-dasharray="4 4"/>'; });
    return s + '</svg>';
  }
  function maakCasino(tegels, blok) {
    const t = tegels.find(x => x.href === 'rommelcasino.html'); if (!t) return;
    const sec = document.createElement('section'); sec.className = 'tg-casino'; sec.setAttribute('aria-labelledby', 'tg-casino-kop');
    const lampjes = n => '<i></i>'.repeat(n);
    sec.innerHTML = `<a class="tg-cas-bord" href="rommelcasino.html">
        <span class="tg-cas-lamp boven" aria-hidden="true">${lampjes(16)}</span><span class="tg-cas-lamp onder" aria-hidden="true">${lampjes(16)}</span>
        <span class="tg-cas-tekst"><span class="tg-cas-label">${t.nieuw ? 'Nieuw · nu open' : 'Nu open'}</span>
          <h2 class="tg-cas-neon" id="tg-casino-kop">Casino Rommelroyaal</h2>
          <span class="tg-cas-zin">Veertien spellen in zes zalen: blackjack met een rekenuil, roulette, kien, krasloten en meer. Alleen speelfiches, nooit echt geld.</span>
          <span class="tg-cas-status"></span></span>
        <span class="tg-cas-plaat" aria-hidden="true">${casinoPlaat()}</span>
        <span class="tg-cas-knop">Ga naar binnen <span aria-hidden="true">›</span></span>
      </a>`;
    const vd = document.getElementById('vandaag'); (vd || blok).before(sec);
    // de lampjes: zoveel als er passen
    const bord = sec.querySelector('.tg-cas-bord'), pas = () => { const n = Math.max(8, Math.min(30, Math.round(bord.clientWidth / 34))); sec.querySelectorAll('.tg-cas-lamp').forEach(l => { if (l.children.length !== n) l.innerHTML = lampjes(n); }); };
    pas(); addEventListener('resize', pas);
    // wat je in het casino al deed: de hand van de dag van vandaag, en je sterren
    const status = () => {
      const s = lees('rommelcasino-v1'), d = s && s.dag && typeof s.dag === 'object' ? s.dag[nlDag()] : null, uit = [];
      if (!s) uit.push('Elke dag de hand van de dag');
      else uit.push(Array.isArray(d) ? 'Hand van de dag: ' + Math.round(+d[0] || 0) + ' van 100' : 'De hand van de dag staat klaar');
      if (s && +s.ster > 0) uit.push(Math.round(+s.ster) + ' van ' + (+s.voortgangTotaal > 0 ? s.voortgangTotaal : 67) + ' sterren');
      const html = uit.map(x => '<span>' + veilig(x) + '</span>').join(''), el = sec.querySelector('.tg-cas-status'); if (el.innerHTML !== html) el.innerHTML = html;
    };
    status(); addEventListener('pageshow', status); addEventListener('focus', status); addEventListener('storage', status); addEventListener('rommelhoekje-bijgewerkt', status);
  }

  // ================= nep-reclame (banners.js, via Scorebord.banner in het scorebord-blok): rouleert vanzelf, en nieuwe spellen komen
  // de eerste 7 dagen vaker langs. Tussen Puzzels van vandaag en Alle spellen een balk (computer) of blok (telefoon), en op een
  // groot scherm een hoge advertentie (160 x 600) in de rechter kantlijn, naast Puzzels van vandaag.
  let reclameHoog = null, hoogGestart = false;
  function maakReclame(blok) {
    if (!window.Scorebord || !Scorebord.banner) return;
    const sec = document.createElement('section'); sec.className = 'tg-reclame'; sec.setAttribute('aria-label', 'Advertentie');
    blok.before(sec);
    Scorebord.banner(sec, {});
    reclameHoog = document.createElement('div'); reclameHoog.className = 'tg-reclame-hoog'; reclameHoog.hidden = true;
    document.body.appendChild(reclameHoog);
    plaatsHoog(); addEventListener('resize', plaatsHoog); addEventListener('load', plaatsHoog);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(plaatsHoog);
  }
  // de hoge advertentie staat in het midden van de rechter kantlijn, met de bovenkant gelijk aan Puzzels van vandaag (of de advertentiebalk)
  function plaatsHoog() {
    const h = reclameHoog, main = $('main'); if (!h || !main) return null;
    const m = main.getBoundingClientRect(), vw = document.documentElement.clientWidth, rand = m.right - 24, ruimte = vw - rand;
    const boven = $('#vandaag') || $('.tg-reclame');
    if (ruimte < 208 || !boven) { h.hidden = true; return null; }
    const top = boven.getBoundingClientRect().top + scrollY, left = rand + (ruimte - 160) / 2;
    h.hidden = false; h.style.transform = 'translate(' + Math.round(left) + 'px,' + Math.round(top) + 'px)';
    if (!hoogGestart) { hoogGestart = true; Scorebord.banner(h, { vorm: 'hoog' }); }
    return { l: left, t: top, r: left + 160, b: top + 618 };
  }

  // ================= opbouwen (zodra home_v8 de categorieën heeft gezet)
  function bouw() {
    if (window.__v6) return; const v8 = $('.v8'); if (!v8) return;
    window.__v6 = true;
    const st = document.createElement('style'); st.id = 'v6-stijl'; st.textContent = CSS; document.head.appendChild(st);
    document.body.classList.add('v6-body');
    const cats = [...document.querySelectorAll('.v8-cat')].map(sec => ({ id: sec.id.replace(/^cat-/, ''), naam: (sec.querySelector('h2') || {}).textContent || '', kaarten: [...sec.querySelectorAll('.label:not(.leeg) .label-kaart[href]')] }));
    const kortVan = {}; document.querySelectorAll('.v8-nav a').forEach(a => { kortVan[(a.getAttribute('href') || '').replace(/^#cat-/, '')] = a.textContent.trim(); });
    const voortgang = {}; document.querySelectorAll('.v8-mini').forEach(a => { const sm = a.querySelector('small'), em = a.querySelector('em'); voortgang[a.getAttribute('href')] = { tekst: sm ? sm.textContent.trim() : '', f: em && em.style.width ? parseFloat(em.style.width) : null }; });
    // de tegels
    const tegels = [];
    for (const c of cats) for (const a of c.kaarten) {
      const so = a.querySelector('.soort'), soort = so ? ([...so.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim() || 'Spel') : 'Spel';
      tegels.push({ cat: c.id, href: a.getAttribute('href'), naam: ((a.querySelector('.naam') || {}).textContent || '').replace(/\u00AD/g, '').trim(), soort, uitleg: ((a.querySelector('p') || {}).textContent || '').trim(), icoon: (a.querySelector('.label-icoon') || {}).innerHTML || '', icoonNaam: a.dataset.icoon || '', nieuw: !!(so && so.querySelector('.stempel')) });
    }
    // Rommelhotel Online heeft geen kaartje op de homepage: zet hem vooraan bij de werelden
    if (!tegels.some(t => t.href === 'rommelhotel-online.html')) {
      const solo = tegels.find(t => t.href === 'rommelhotel.html' || t.icoonNaam === 'hotel'), ico = solo ? solo.icoon : '';
      const plek = tegels.findIndex(t => t.cat === 'werelden');
      tegels.splice(plek < 0 ? 0 : plek, 0, { cat: plek < 0 ? (cats[0] || { id: '' }).id : 'werelden', href: 'rommelhotel-online.html', naam: 'Rommelhotel Online', soort: 'Online', uitleg: 'Het Rommelhotel, live met je vrienden: maak je eigen poppetje, richt je kamer in en chat.', icoon: ico, nieuw: false });
    }
    const tegelHTML = (t, i) => {
      const vg = voortgang[t.href], zin = ONDERSCHRIFT[t.href] || kort(t.uitleg);
      const label = t.naam + (t.nieuw ? ', nieuw' : '') + (t.uitleg ? ': ' + t.uitleg : '');
      return `<a class="tg-tegel" href="${veilig(t.href)}" data-cat="${veilig(t.cat)}" aria-label="${veilig(label)}">
        <span class="tg-vlak ${VORMEN[i % VORMEN.length]}" style="background:${KLEUREN[i % KLEUREN.length]}" aria-hidden="true">${t.icoon}${t.nieuw ? '<span class="tg-nieuw">Nieuw</span>' : ''}</span>
        <span class="tg-naam" aria-hidden="true">${veilig(t.naam)}</span>
        <span class="tg-zin" aria-hidden="true">${veilig(zin)}</span>
        ${vg && vg.tekst ? `<span class="tg-voortgang" aria-hidden="true">${veilig(vg.tekst)}${vg.f != null && !isNaN(vg.f) ? `<i><em style="width:${Math.max(3, Math.min(100, vg.f))}%"></em></i>` : ''}</span>` : ''}
      </a>`;
    };
    const blok = document.createElement('section'); blok.className = 'tg'; blok.id = 'spellen'; blok.setAttribute('aria-labelledby', 'tg-kop');
    blok.innerHTML = `<div class="tg-balk"><div class="tg-filters" role="group" aria-label="Kies een soort">
        <button type="button" data-cat="" aria-pressed="true">Alles</button>
        ${cats.filter(c => c.kaarten.length || c.id === 'werelden').map(c => `<button type="button" data-cat="${veilig(c.id)}" aria-pressed="false">${veilig(kortVan[c.id] || c.naam)}</button>`).join('')}
      </div></div>
      <h2 id="tg-kop"><span>Alle spellen</span></h2>
      <div class="tg-raster">${tegels.map(tegelHTML).join('')}</div>`;
    v8.before(blok);
    try { maakDag(tegels, blok); } catch (e) {}
    try { maakCasino(tegels, blok); } catch (e) {}
    try { maakReclame(blok); } catch (e) {}
    // de coulissen staan na de eerste rij kaartjes, dus in de oude weergave van home_v8: eerst eruit halen, dan pas verbergen
    const coul = $('.coulissen'); if (coul && v8.contains(coul)) blok.after(coul);
    // filteren
    const titels = Object.fromEntries(cats.map(c => [c.id, c.naam]));
    blok.querySelector('.tg-filters').addEventListener('click', e => {
      const b = e.target.closest('button[data-cat]'); if (!b) return; const cat = b.dataset.cat;
      blok.querySelectorAll('.tg-filters button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      blok.querySelectorAll('.tg-tegel').forEach(t => { t.hidden = !!cat && t.dataset.cat !== cat; });
      blok.querySelector('#tg-kop span').textContent = cat ? (titels[cat] || b.textContent) : 'Alle spellen';
    });
    // de knop voor licht en donker
    const balk = blok.querySelector('.tg-balk');
    if (balk) {
      const w = document.createElement('div'); w.className = 'tg-weergave'; w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Licht of donker');
      w.innerHTML = `<button type="button" data-thema="auto"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></svg><span class="tg-woord">Automatisch</span></button>
        <button type="button" data-thema="licht"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg><span class="tg-woord">Licht</span></button>
        <button type="button" data-thema="donker"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1z"/></svg><span class="tg-woord">Donker</span></button>`;
      balk.appendChild(w);
      w.addEventListener('click', e => { const b = e.target.closest('button[data-thema]'); if (!b) return; try { if (b.dataset.thema === 'auto') localStorage.removeItem(THEMA); else localStorage.setItem(THEMA, b.dataset.thema); } catch (x) {} pasThemaToe(); });
      pasThemaToe();
    }
    // het briefje: geen gereedschap meer, maar rommeltjes
    const p = $('.briefje p'); if (p && /het gereedschap/.test(p.textContent)) p.textContent = p.textContent.replace('het gereedschap', 'de rommeltjes');
    zetRommeltjes();
  }

  // ================= de rommeltjes: echte natuurkunde (zie "Rommeltjes met echte natuurkunde" in CLAUDE.md)
  // Een eigen kleine natuurkundemotor (Fysica, hieronder), acht soorten rommeltjes met elk een eigen kunstje,
  // kantelen en schudden, geluid en een trillinkje. Rekent alleen als er iets beweegt.
  // ==== FYSICA begin
  // Een kleine 2D-natuurkundemotor voor de rommeltjes, zonder bibliotheek.
  // Vormen: cirkels en bolle veelhoeken (lichamen), en vaste veelhoeken en lijnstukjes (de pagina).
  // Botsen met wrijving, stuiteren en draaien; een vaste tijdstap; vooruitkijkende contacten (niets
  // schiet ergens doorheen); slapen in rust; een veer om iets op te pakken. Lengtes in px, tijd in s.
  var Fysica = (function () {
    'use strict';
    var MARGE = 2.5;          // contacten tot zo ver uit elkaar tellen al mee (px)
    var SLOP = 0.5;           // zo veel overlap mag (px)
    var BETA = 0.25;          // hoe snel overlap wordt rechtgezet
    var MAX_CORR = 420;       // hooguit zo snel (px/s)
    var STUIT_DREMPEL = 70;   // langzamer dan dit stuitert niets (px/s)
    var IMPACT = 55;          // vanaf deze snelheid telt een botsing als tik (px/s)
    var SLAAP_V = 9, SLAAP_W = 0.12, SLAAP_T = 0.4;
    var ITER = 10, VMAX = 5200, WMAX = 55;

    function nieuwId(w) { return w.volg++; }

    // ---------- vormen
    function cirkel(r, k) { // k: traagheid als deel van m·r² (0,5 schijf, 0,4 bol)
      return { soort: 'cirkel', r: r, ox: 0, oy: 0, opp: Math.PI * r * r, I1: (k == null ? 0.5 : k) * Math.PI * r * r * r * r, straal: r };
    }
    function ordenen(punten) {
      var p = punten.map(function (q) { return [q[0], q[1]]; }), opp = 0, n = p.length, i;
      for (i = 0; i < n; i++) { var a = p[i], b = p[(i + 1) % n]; opp += a[0] * b[1] - b[0] * a[1]; }
      if (opp < 0) p.reverse();
      return p;
    }
    function normalen(v, n) {
      var nn = new Float64Array(2 * n);
      for (var i = 0; i < n; i++) {
        var j = (i + 1) % n, ex = v[2 * j] - v[2 * i], ey = v[2 * j + 1] - v[2 * i + 1], l = Math.hypot(ex, ey) || 1;
        nn[2 * i] = ey / l; nn[2 * i + 1] = -ex / l;
      }
      return nn;
    }
    // een bolle veelhoek, in tekencoördinaten (px rond het midden van de tekening)
    function poly(punten) {
      var p = ordenen(punten), n = p.length, i;
      var sx = p[0][0], sy = p[0][1], A = 0, cx = 0, cy = 0, I = 0;
      for (i = 0; i < n; i++) {
        var q = p[(i + 1) % n], e1x = p[i][0] - sx, e1y = p[i][1] - sy, e2x = q[0] - sx, e2y = q[1] - sy;
        var D = e1x * e2y - e1y * e2x, ta = 0.5 * D;
        A += ta; cx += ta * (e1x + e2x) / 3; cy += ta * (e1y + e2y) / 3;
        I += (0.25 / 3 * D) * (e1x * e1x + e2x * e1x + e2x * e2x + e1y * e1y + e2y * e1y + e2y * e2y);
      }
      cx /= A; cy /= A;
      var Ic = I - A * (cx * cx + cy * cy), ox = sx + cx, oy = sy + cy;
      var v = new Float64Array(2 * n), straal = 0;
      for (i = 0; i < n; i++) { v[2 * i] = p[i][0] - ox; v[2 * i + 1] = p[i][1] - oy; straal = Math.max(straal, Math.hypot(v[2 * i], v[2 * i + 1])); }
      return { soort: 'poly', n: n, v: v, nn: normalen(v, n), ox: ox, oy: oy, opp: A, I1: Ic, straal: straal };
    }
    // een rechthoek met afgeschuinde hoeken (zo rolt en tuimelt hij als iets met ronde hoeken)
    function doos(b, h, rond) { // ronde hoeken: elke hoek drie stukjes van een boog
      var x = b / 2, y = h / 2, c = Math.min(rond || 0, x * 0.45, y * 0.45), p = [];
      if (!c) return poly([[-x, -y], [x, -y], [x, y], [-x, y]]);
      var hoeken = [[x - c, y - c, 0], [-x + c, y - c, 1], [-x + c, -y + c, 2], [x - c, -y + c, 3]];
      hoeken.forEach(function (h) { for (var k = 0; k <= 3; k++) { var a = (h[2] + k / 3) * Math.PI / 2; p.push([h[0] + c * Math.cos(a), h[1] + c * Math.sin(a)]); } });
      return poly(p);
    }

    // ---------- botsen (normaal altijd van A naar B)
    function polyCirkel(P, cx, cy, r, marge) { // normaal van de veelhoek naar de cirkel
      var n = P.n, v = P.wv, nn = P.wn, best = -Infinity, bi = 0, i;
      for (i = 0; i < n; i++) {
        var s = nn[2 * i] * (cx - v[2 * i]) + nn[2 * i + 1] * (cy - v[2 * i + 1]);
        if (s > r + marge) return null;
        if (s > best) { best = s; bi = i; }
      }
      var j = (bi + 1) % n, x1 = v[2 * bi], y1 = v[2 * bi + 1], x2 = v[2 * j], y2 = v[2 * j + 1], nx, ny, sep;
      if (best < 1e-6) { nx = nn[2 * bi]; ny = nn[2 * bi + 1]; sep = best - r; }
      else {
        var u1 = (cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1), u2 = (cx - x2) * (x1 - x2) + (cy - y2) * (y1 - y2), dx, dy, d;
        if (u1 <= 0 || u2 <= 0) {
          if (u1 <= 0) { dx = cx - x1; dy = cy - y1; } else { dx = cx - x2; dy = cy - y2; }
          d = Math.hypot(dx, dy); if (d - r > marge) return null;
          nx = dx / d; ny = dy / d; sep = d - r;
        } else { nx = nn[2 * bi]; ny = nn[2 * bi + 1]; sep = best - r; }
      }
      return { nx: nx, ny: ny, pts: [{ x: cx - nx * (r + sep * 0.5), y: cy - ny * (r + sep * 0.5), sep: sep, id: 0 }] };
    }
    function segCirkel(S, cx, cy, r, marge) { // normaal van het lijnstukje naar de cirkel
      var ex = S.bx - S.ax, ey = S.by - S.ay, ll = ex * ex + ey * ey;
      var t = ll ? ((cx - S.ax) * ex + (cy - S.ay) * ey) / ll : 0; t = t < 0 ? 0 : t > 1 ? 1 : t;
      var qx = S.ax + t * ex, qy = S.ay + t * ey, dx = cx - qx, dy = cy - qy, d = Math.hypot(dx, dy), sep = d - r - S.r;
      if (sep > marge) return null;
      var nx, ny;
      if (d > 1e-9) { nx = dx / d; ny = dy / d; } else { var l = Math.sqrt(ll) || 1; nx = ey / l; ny = -ex / l; if (ny > 0) { nx = -nx; ny = -ny; } }
      return { nx: nx, ny: ny, pts: [{ x: qx + nx * (S.r + sep * 0.5), y: qy + ny * (S.r + sep * 0.5), sep: sep, id: 0 }] };
    }
    function maxScheiding(A, B) {
      var best = -Infinity, bi = 0, av = A.wv, an = A.wn, bv = B.wv, m = B.n;
      for (var i = 0; i < A.n; i++) {
        var nx = an[2 * i], ny = an[2 * i + 1], vx = av[2 * i], vy = av[2 * i + 1], mn = Infinity;
        for (var j = 0; j < m; j++) { var d = nx * (bv[2 * j] - vx) + ny * (bv[2 * j + 1] - vy); if (d < mn) mn = d; }
        if (mn > best) { best = mn; bi = i; }
      }
      return [best, bi];
    }
    function knip(p, nx, ny, off, id) { // houd het deel van het lijnstukje p (2 punten) aan de binnenkant
      var d0 = nx * p[0].x + ny * p[0].y - off, d1 = nx * p[1].x + ny * p[1].y - off, uit = [];
      if (d0 <= 0) uit.push(p[0]);
      if (d1 <= 0) uit.push(p[1]);
      if (d0 * d1 < 0) { var f = d0 / (d0 - d1); uit.push({ x: p[0].x + f * (p[1].x - p[0].x), y: p[0].y + f * (p[1].y - p[0].y), id: id }); }
      return uit.length < 2 ? null : uit;
    }
    function polyPoly(A, B, marge) {
      var ra = maxScheiding(A, B); if (ra[0] > marge) return null;
      var rb = maxScheiding(B, A); if (rb[0] > marge) return null;
      var ref, inc, e, flip;
      if (rb[0] > ra[0] + 0.05) { ref = B; inc = A; e = rb[1]; flip = 1; } else { ref = A; inc = B; e = ra[1]; flip = 0; }
      var nx = ref.wn[2 * e], ny = ref.wn[2 * e + 1], ii = 0, mn = Infinity, i;
      for (i = 0; i < inc.n; i++) { var d = nx * inc.wn[2 * i] + ny * inc.wn[2 * i + 1]; if (d < mn) { mn = d; ii = i; } }
      var i2 = (ii + 1) % inc.n, e2 = (e + 1) % ref.n, basis = flip * 10000 + e * 100;
      var v1x = ref.wv[2 * e], v1y = ref.wv[2 * e + 1], v2x = ref.wv[2 * e2], v2y = ref.wv[2 * e2 + 1];
      var tx = v2x - v1x, ty = v2y - v1y, tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      var p = [{ x: inc.wv[2 * ii], y: inc.wv[2 * ii + 1], id: basis + ii }, { x: inc.wv[2 * i2], y: inc.wv[2 * i2 + 1], id: basis + i2 }];
      p = knip(p, -tx, -ty, -(tx * v1x + ty * v1y), basis + 50); if (!p) return null;
      p = knip(p, tx, ty, tx * v2x + ty * v2y, basis + 51); if (!p) return null;
      var pts = [];
      for (i = 0; i < p.length; i++) {
        var sep = nx * (p[i].x - v1x) + ny * (p[i].y - v1y);
        if (sep <= marge) pts.push({ x: p[i].x - nx * sep * 0.5, y: p[i].y - ny * sep * 0.5, sep: sep, id: p[i].id });
      }
      if (!pts.length) return null;
      return flip ? { nx: -nx, ny: -ny, pts: pts } : { nx: nx, ny: ny, pts: pts };
    }
    function draaiOm(m) { if (m) { m.nx = -m.nx; m.ny = -m.ny; } return m; }
    // A is altijd een lichaam; B een lichaam of iets vasts
    function botsing(A, B, marge) {
      var a = A.vorm.soort, b = B.vorm.soort;
      if (a === 'cirkel') {
        if (b === 'cirkel') {
          var dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy), sep = d - A.vorm.r - B.vorm.r;
          if (sep > marge) return null;
          var nx = d > 1e-9 ? dx / d : 0, ny = d > 1e-9 ? dy / d : 1;
          return { nx: nx, ny: ny, pts: [{ x: A.x + nx * (A.vorm.r + sep * 0.5), y: A.y + ny * (A.vorm.r + sep * 0.5), sep: sep, id: 0 }] };
        }
        if (b === 'seg') return draaiOm(segCirkel(B.vorm, A.x, A.y, A.vorm.r, marge));
        return draaiOm(polyCirkel(B.geo, A.x, A.y, A.vorm.r, marge));
      }
      if (b === 'cirkel') return polyCirkel(A.geo, B.x, B.y, B.vorm.r, marge);
      return polyPoly(A.geo, B.geo, marge);
    }

    // ---------- de wereld
    function Wereld(o) {
      o = o || {};
      this.G = o.g || 2600; this.gx = 0; this.gy = this.G;
      this.lichamen = []; this.vast = []; this.veren = [];
      this.volg = 1; this.oud = new Map(); this.contacten = [];
      this.opBotsing = null; this.voorStap = null;
      this.stappen = 0;
    }
    var W = Wereld.prototype;

    W.lichaam = function (o) {
      var v = o.vorm, d = o.dichtheid || 1, a = o.a || 0, c = Math.cos(a), s = Math.sin(a);
      var b = {
        id: nieuwId(this), vorm: v, x: (o.x || 0) + c * v.ox - s * v.oy, y: (o.y || 0) + s * v.ox + c * v.oy, a: a,
        vx: o.vx || 0, vy: o.vy || 0, w: o.w || 0, m: d * v.opp, I: d * v.I1,
        wr: o.wrijving == null ? 0.5 : o.wrijving, st: o.stuit == null ? 0.2 : o.stuit,
        rol: o.rol || 0, dempL: o.dempL == null ? 0.02 : o.dempL, dempA: o.dempA == null ? 0.15 : o.dempA,
        slaap: !!o.slaap, rust: 0, vlak: !!o.vlak, kin: false, geest: false, raakt: false, glij: 0, soort: o.soort || '', data: o.data || {},
        px: 0, py: 0, pa: 0, geo: null, aabb: [0, 0, 0, 0]
      };
      b.im = 1 / b.m; b.iI = 1 / b.I;
      if (v.soort === 'poly') b.geo = { n: v.n, wv: new Float64Array(2 * v.n), wn: new Float64Array(2 * v.n) };
      b.px = b.x; b.py = b.y; b.pa = b.a;
      werk(b, 0);
      this.lichamen.push(b);
      return b;
    };
    // het midden van de tekening (voor het tekenen)
    W.midden = function (b, x, y, a) {
      var c = Math.cos(a), s = Math.sin(a), v = b.vorm;
      return [x - c * v.ox + s * v.oy, y - s * v.ox - c * v.oy];
    };
    W.zetMidden = function (b, x, y, a) {
      var c = Math.cos(a), s = Math.sin(a), v = b.vorm;
      b.a = a; b.x = x + c * v.ox - s * v.oy; b.y = y + s * v.ox + c * v.oy; b.px = b.x; b.py = b.y; b.pa = a;
      werk(b, 0);
    };

    function vastPoly(w, punten, o) {
      var p = ordenen(punten), n = p.length, v = new Float64Array(2 * n), i, mnx = Infinity, mny = Infinity, mxx = -Infinity, mxy = -Infinity;
      for (i = 0; i < n; i++) { v[2 * i] = p[i][0]; v[2 * i + 1] = p[i][1]; mnx = Math.min(mnx, p[i][0]); mny = Math.min(mny, p[i][1]); mxx = Math.max(mxx, p[i][0]); mxy = Math.max(mxy, p[i][1]); }
      var s = { id: nieuwId(w), vast: true, vorm: { soort: 'poly' }, geo: { n: n, wv: v, wn: normalen(v, n) }, aabb: [mnx, mny, mxx, mxy],
        wr: o.wrijving == null ? 0.6 : o.wrijving, st: o.stuit == null ? 0.2 : o.stuit, rand: !!o.rand, el: o.el || null, data: o.data || {} };
      w.vast.push(s);
      return s;
    }
    // een doos met afgeschuinde hoeken, in wereldcoördinaten
    W.vastDoos = function (x0, y0, x1, y1, o) {
      o = o || {};
      var c = Math.min(o.schuin || 0, (x1 - x0) * 0.3, (y1 - y0) * 0.3);
      var p = c > 0.5 ? [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1], [x0, y1 - c], [x0, y0 + c]] : [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      return vastPoly(this, p, o);
    };
    // een bolle veelhoek in wereldcoördinaten (zoals een gedraaid briefje)
    W.vastVeelhoek = function (punten, o) { return vastPoly(this, punten, o || {}); };
    // een lijnstukje met een dikte (zoals een potloodstreep)
    W.vastLijn = function (ax, ay, bx, by, r, o) {
      o = o || {};
      var dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
      var px = -dy * r, py = dx * r, ex = dx * r, ey = dy * r;
      var s = vastPoly(this, [[ax - ex + px, ay - ey + py], [bx + ex + px, by + ey + py], [bx + ex - px, by + ey - py], [ax - ex - px, ay - ey - py]], o);
      s.vorm = { soort: 'seg', ax: ax, ay: ay, bx: bx, by: by, r: r };
      return s;
    };
    W.weg = function (s) {
      var i = this.vast.indexOf(s); if (i >= 0) this.vast.splice(i, 1);
      i = this.lichamen.indexOf(s); if (i >= 0) this.lichamen.splice(i, 1);
    };
    W.leegVast = function (welke) { this.vast = this.vast.filter(function (s) { return !welke(s); }); };

    // ---------- wakker en slapen
    function overlapt(a, b, m) { return a[0] - m <= b[2] && b[0] - m <= a[2] && a[1] - m <= b[3] && b[1] - m <= a[3]; }
    W.wek = function (b) {
      if (!b.slaap) { b.rust = 0; return; }
      b.slaap = false; b.rust = 0;
      for (var i = 0; i < this.lichamen.length; i++) { var c = this.lichamen[i]; if (c.slaap && overlapt(b.aabb, c.aabb, 6)) this.wek(c); }
    };
    W.wekAlles = function () { for (var i = 0; i < this.lichamen.length; i++) { var b = this.lichamen[i]; b.slaap = false; b.rust = 0; } };
    W.wekBij = function (aabb, m) { for (var i = 0; i < this.lichamen.length; i++) { var b = this.lichamen[i]; if (b.slaap && overlapt(aabb, b.aabb, m || 8)) this.wek(b); } };
    W.allesSlaapt = function () {
      if (this.veren.length) return false;
      for (var i = 0; i < this.lichamen.length; i++) { var b = this.lichamen[i]; if (!b.slaap || b.kin) return false; }
      return true;
    };

    // wereldpunten, normalen en omhullende doos
    function werk(b, dt) {
      var c = Math.cos(b.a), s = Math.sin(b.a), v = b.vorm, m = MARGE + Math.hypot(b.vx, b.vy) * dt;
      if (v.soort === 'cirkel') { b.aabb[0] = b.x - v.r - m; b.aabb[1] = b.y - v.r - m; b.aabb[2] = b.x + v.r + m; b.aabb[3] = b.y + v.r + m; return; }
      var g = b.geo, mnx = Infinity, mny = Infinity, mxx = -Infinity, mxy = -Infinity;
      for (var i = 0; i < v.n; i++) {
        var lx = v.v[2 * i], ly = v.v[2 * i + 1], x = b.x + c * lx - s * ly, y = b.y + s * lx + c * ly;
        g.wv[2 * i] = x; g.wv[2 * i + 1] = y;
        g.wn[2 * i] = c * v.nn[2 * i] - s * v.nn[2 * i + 1]; g.wn[2 * i + 1] = s * v.nn[2 * i] + c * v.nn[2 * i + 1];
        if (x < mnx) mnx = x; if (y < mny) mny = y; if (x > mxx) mxx = x; if (y > mxy) mxy = y;
      }
      b.aabb[0] = mnx - m; b.aabb[1] = mny - m; b.aabb[2] = mxx + m; b.aabb[3] = mxy + m;
    }
    W.werk = function (b) { werk(b, 0); };

    // ---------- oppakken: een zachte veer naar je vinger of muis
    W.pak = function (b, wx, wy, o) {
      o = o || {};
      var c = Math.cos(-b.a), s = Math.sin(-b.a), rx = wx - b.x, ry = wy - b.y;
      var j = { b: b, lx: c * rx - s * ry, ly: s * rx + c * ry, tx: wx, ty: wy, hz: o.hz || 6, zeta: o.zeta == null ? 0.7 : o.zeta,
        maxF: (o.kracht || 40000) * b.m, ix: 0, iy: 0, rx: 0, ry: 0, M: [0, 0, 0], cx: 0, cy: 0, gamma: 0 };
      this.wek(b); b.geest = o.geest !== false;
      this.veren.push(j);
      return j;
    };
    W.laatLos = function (j) {
      var i = this.veren.indexOf(j); if (i >= 0) this.veren.splice(i, 1);
      j.b.geest = false;
    };
    function veerKlaar(j, dt) {
      var b = j.b, om = 2 * Math.PI * j.hz, d = 2 * b.m * j.zeta * om, k = b.m * om * om;
      var g = dt * (d + dt * k); j.gamma = g ? 1 / g : 0; var beta = dt * k * j.gamma;
      var c = Math.cos(b.a), s = Math.sin(b.a); j.rx = c * j.lx - s * j.ly; j.ry = s * j.lx + c * j.ly;
      var k11 = b.im + b.iI * j.ry * j.ry + j.gamma, k12 = -b.iI * j.rx * j.ry, k22 = b.im + b.iI * j.rx * j.rx + j.gamma;
      var det = k11 * k22 - k12 * k12; det = det ? 1 / det : 0;
      j.M[0] = det * k22; j.M[1] = -det * k12; j.M[2] = det * k11;
      j.cx = beta * (b.x + j.rx - j.tx); j.cy = beta * (b.y + j.ry - j.ty);
      j.ix *= 0.9; j.iy *= 0.9;
      b.vx += b.im * j.ix; b.vy += b.im * j.iy; b.w += b.iI * (j.rx * j.iy - j.ry * j.ix);
      b.w *= 0.985;
    }
    function veerLos(j, dt) {
      var b = j.b, vx = b.vx - b.w * j.ry + j.cx + j.gamma * j.ix, vy = b.vy + b.w * j.rx + j.cy + j.gamma * j.iy;
      var px = -(j.M[0] * vx + j.M[1] * vy), py = -(j.M[1] * vx + j.M[2] * vy);
      var ox = j.ix, oy = j.iy; j.ix += px; j.iy += py;
      var mx = j.maxF * dt, l = Math.hypot(j.ix, j.iy); if (l > mx) { j.ix *= mx / l; j.iy *= mx / l; }
      px = j.ix - ox; py = j.iy - oy;
      b.vx += b.im * px; b.vy += b.im * py; b.w += b.iI * (j.rx * py - j.ry * px);
    }

    // ---------- contacten klaarzetten
    function maakContact(w, A, B, m, dt) {
      var vast = !!B.vast, imA = A.kin ? 0 : A.im, iIA = A.kin ? 0 : A.iI;
      var imB = vast || B.slaap || B.kin ? 0 : B.im, iIB = vast || B.slaap || B.kin ? 0 : B.iI;
      var vBx = vast ? 0 : B.vx, vBy = vast ? 0 : B.vy, wB = vast ? 0 : B.w, bx = vast ? 0 : B.x, by = vast ? 0 : B.y;
      var nx = m.nx, ny = m.ny, tx = ny, ty = -nx;
      var c = { A: A, B: B, nx: nx, ny: ny, imA: imA, iIA: iIA, imB: imB, iIB: iIB, wr: Math.sqrt(A.wr * B.wr), st: Math.max(A.st, B.st), pts: m.pts, sleutel: A.id + '|' + B.id };
      var oud = w.oud.get(c.sleutel);
      for (var i = 0; i < m.pts.length; i++) {
        var p = m.pts[i], rax = p.x - A.x, ray = p.y - A.y, rbx = p.x - bx, rby = p.y - by;
        var rnA = rax * ny - ray * nx, rnB = rbx * ny - rby * nx, rtA = rax * ty - ray * tx, rtB = rbx * ty - rby * tx;
        var kn = imA + imB + iIA * rnA * rnA + iIB * rnB * rnB, kt = imA + imB + iIA * rtA * rtA + iIB * rtB * rtB;
        p.rax = rax; p.ray = ray; p.rbx = rbx; p.rby = rby; p.mn = kn > 0 ? 1 / kn : 0; p.mt = kt > 0 ? 1 / kt : 0;
        var dvx = vBx - wB * rby - (A.vx - A.w * ray), dvy = vBy + wB * rbx - (A.vy + A.w * rax);
        p.vn0 = dvx * nx + dvy * ny;
        p.vmin = p.sep > 0 ? -p.sep / dt : Math.min(BETA * Math.max(0, -p.sep - SLOP) / dt, MAX_CORR);
        p.pn = 0; p.pt = 0; p.maxPn = 0; p.nieuw = true;
        if (oud) for (var k = 0; k < oud.length; k++) if (oud[k].id === p.id) { p.pn = oud[k].pn * 0.85; p.pt = oud[k].pt * 0.85; p.nieuw = false; break; }
      }
      return c;
    }
    function duw(c, p, Px, Py) {
      var A = c.A, B = c.B;
      A.vx -= c.imA * Px; A.vy -= c.imA * Py; A.w -= c.iIA * (p.rax * Py - p.ray * Px);
      if (c.imB) { B.vx += c.imB * Px; B.vy += c.imB * Py; B.w += c.iIB * (p.rbx * Py - p.rby * Px); }
    }
    function relV(c, p) {
      var A = c.A, B = c.B, vBx = 0, vBy = 0, wB = 0;
      if (!B.vast) { vBx = B.vx; vBy = B.vy; wB = B.w; }
      return [vBx - wB * p.rby - (A.vx - A.w * p.ray), vBy + wB * p.rbx - (A.vy + A.w * p.rax)];
    }

    // ---------- één stap
    W.stap = function (dt) {
      var L = this.lichamen, V = this.vast, i, j, k, b;
      if (this.voorStap) this.voorStap(dt);
      this.stappen++;
      for (i = 0; i < L.length; i++) {
        b = L[i]; b.px = b.x; b.py = b.y; b.pa = b.a; var raakte = b.raakt; b.raakt = false; b.glij = 0;
        if (b.slaap || b.kin) continue;
        b.vx += this.gx * dt; b.vy += this.gy * dt;
        // een dobbelsteen balanceert niet op een hoek: langzaam en schuin op iets, dan valt hij naar de dichtstbijzijnde platte kant
        if (b.vlak && raakte && !b.geest && b.w * b.w < 4 && b.vx * b.vx + b.vy * b.vy < 3600) {
          var sch = ((b.a % (Math.PI / 2)) + Math.PI / 2) % (Math.PI / 2);
          if (sch > 0.08 && sch < Math.PI / 2 - 0.08) b.w += (sch < Math.PI / 4 - 0.01 ? -1 : sch > Math.PI / 4 + 0.01 ? 1 : (b.w < 0 ? -1 : 1)) * 30 * dt;
        }
        var dl = 1 / (1 + dt * b.dempL), da = 1 / (1 + dt * b.dempA);
        b.vx *= dl; b.vy *= dl; b.w *= da;
      }
      for (i = 0; i < L.length; i++) werk(L[i], dt);
      // lichamen onderling: eerst kijken wie er wakker moet worden
      var paren = [], C = [];
      for (i = 0; i < L.length; i++) for (j = i + 1; j < L.length; j++) {
        var A = L[i], B = L[j];
        if (A.slaap && B.slaap) continue;
        if (A.kin && B.kin) continue;
        if (!overlapt(A.aabb, B.aabb, 0)) continue;
        var mm = botsing(A, B, MARGE + Math.hypot(A.vx - B.vx, A.vy - B.vy) * dt);
        if (mm) paren.push([A, B, mm]);
      }
      for (var ronde = 0; ronde < 3; ronde++) {
        var veranderd = false;
        for (k = 0; k < paren.length; k++) {
          var P = paren[k], X = P[0].slaap ? P[1] : P[0], Y = P[0].slaap ? P[0] : P[1];
          if (!Y.slaap || X.slaap) continue;
          var nx = P[2].nx, ny = P[2].ny, s = X === P[0] ? 1 : -1;
          var vn = -s * (X.vx * nx + X.vy * ny);
          var vast = this.veren.some(function (q) { return q.b === X; });
          if (X.kin || vast || vn < -60 || P[2].pts[0].sep < -2.5) { this.wek(Y); veranderd = true; }
        }
        if (!veranderd) break;
      }
      for (k = 0; k < paren.length; k++) {
        var Q = paren[k];
        if (Q[0].slaap && !Q[1].slaap) C.push(maakContact(this, Q[1], Q[0], draaiOm(Q[2]), dt));
        else C.push(maakContact(this, Q[0], Q[1], Q[2], dt));
      }
      // lichamen tegen de pagina
      for (i = 0; i < L.length; i++) {
        b = L[i]; if (b.slaap || b.kin) continue;
        var mg = MARGE + Math.hypot(b.vx, b.vy) * dt;
        for (j = 0; j < V.length; j++) {
          var S = V[j]; if (b.geest && !S.rand) continue;
          if (!overlapt(b.aabb, S.aabb, 0)) continue;
          var m2 = botsing(b, S, mg); if (m2) C.push(maakContact(this, b, S, m2, dt));
        }
      }
      // klaarzetten: veren en contacten opwarmen met de duwtjes van de vorige stap
      for (i = 0; i < this.veren.length; i++) veerKlaar(this.veren[i], dt);
      for (i = 0; i < C.length; i++) {
        var c = C[i];
        for (k = 0; k < c.pts.length; k++) { var p = c.pts[k]; if (p.pn || p.pt) duw(c, p, c.nx * p.pn + c.ny * p.pt, c.ny * p.pn - c.nx * p.pt); }
      }
      // oplossen
      for (var it = 0; it < ITER; it++) {
        for (i = 0; i < this.veren.length; i++) veerLos(this.veren[i], dt);
        for (i = 0; i < C.length; i++) {
          c = C[i]; var tx = c.ny, ty = -c.nx;
          for (k = 0; k < c.pts.length; k++) {
            p = c.pts[k];
            // wrijving
            var dv = relV(c, p), vt = dv[0] * tx + dv[1] * ty, lam = -p.mt * vt, maxF = c.wr * p.pn, npt = p.pt + lam;
            npt = npt < -maxF ? -maxF : npt > maxF ? maxF : npt; lam = npt - p.pt; p.pt = npt;
            duw(c, p, tx * lam, ty * lam);
            // niet door elkaar heen
            dv = relV(c, p); var vn2 = dv[0] * c.nx + dv[1] * c.ny;
            lam = p.mn * (p.vmin - vn2); var npn = p.pn + lam; if (npn < 0) npn = 0; lam = npn - p.pn; p.pn = npn;
            if (npn > p.maxPn) p.maxPn = npn;
            duw(c, p, c.nx * lam, c.ny * lam);
          }
        }
      }
      // stuiteren: met de snelheid van vóór de botsing
      for (i = 0; i < C.length; i++) {
        c = C[i]; if (c.st <= 0) continue;
        for (k = 0; k < c.pts.length; k++) {
          p = c.pts[k]; if (p.vn0 > -STUIT_DREMPEL || p.maxPn <= 0) continue;
          dv = relV(c, p); var vn3 = dv[0] * c.nx + dv[1] * c.ny;
          lam = -p.mn * (vn3 + c.st * p.vn0); var np2 = p.pn + lam; if (np2 < 0) np2 = 0; lam = np2 - p.pn; p.pn = np2;
          duw(c, p, c.nx * lam, c.ny * lam);
        }
      }
      // onthouden voor de volgende stap, tikjes melden
      var nieuwOud = new Map();
      for (i = 0; i < C.length; i++) {
        c = C[i]; var lijst = [];
        for (k = 0; k < c.pts.length; k++) {
          p = c.pts[k]; lijst.push({ id: p.id, pn: p.pn, pt: p.pt });
          if (p.maxPn > 0) {
            c.A.raakt = true; if (!c.B.vast) c.B.raakt = true;
            var dvv = relV(c, p), vtt = Math.abs(dvv[0] * c.ny - dvv[1] * c.nx);
            if (vtt > c.A.glij) c.A.glij = vtt; if (!c.B.vast && vtt > c.B.glij) c.B.glij = vtt;
            if (this.opBotsing && -p.vn0 > IMPACT && (p.nieuw || -p.vn0 > 160)) this.opBotsing(c.A, c.B, -p.vn0, p.x, p.y, c.nx, c.ny);
          }
        }
        nieuwOud.set(c.sleutel, lijst);
      }
      this.oud = nieuwOud; this.contacten = C;
      // verplaatsen
      var g2 = this.gx * this.gx + this.gy * this.gy, gewichtloos = g2 < 0.0225 * this.G * this.G;
      for (i = 0; i < L.length; i++) {
        b = L[i]; if (b.slaap) continue;
        var sp = Math.hypot(b.vx, b.vy); if (sp > VMAX) { b.vx *= VMAX / sp; b.vy *= VMAX / sp; }
        if (b.w > WMAX) b.w = WMAX; else if (b.w < -WMAX) b.w = -WMAX;
        if (b.raakt && b.rol) { var dw = b.rol / b.vorm.straal * dt; b.w = b.w > dw ? b.w - dw : b.w < -dw ? b.w + dw : 0; } // rolweerstand: een vaste rem (px/s²)
        b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.w * dt;
        if (b.kin) continue;
        var vastgepakt = b.geest;
        if (!vastgepakt && b.vx * b.vx + b.vy * b.vy < SLAAP_V * SLAAP_V && b.w * b.w < SLAAP_W * SLAAP_W && (b.raakt || gewichtloos)) {
          b.rust += dt;
          if (b.rust >= SLAAP_T) {
            b.slaap = true; b.vx = 0; b.vy = 0; b.w = 0;
          }
        } else b.rust = 0;
      }
    };

    // ---------- na loslaten: niet in de pagina blijven steken
    // schuift een lichaam uit wat vast is (liefst omhoog), hooguit een paar keer
    W.vrijMaken = function (b) {
      for (var ronde = 0; ronde < 8; ronde++) {
        werk(b, 0);
        var diepst = null, dm = null;
        for (var i = 0; i < this.vast.length; i++) {
          var S = this.vast[i]; if (!overlapt(b.aabb, S.aabb, 0)) continue;
          var m = botsing(b, S, 0); if (!m) continue;
          var sep = Math.min.apply(null, m.pts.map(function (p) { return p.sep; }));
          if (sep < -0.5 && (!dm || sep < dm.sep)) { diepst = S; dm = { sep: sep, m: m }; }
        }
        if (!diepst) return true;
        var a = b.aabb, s = diepst.aabb, h = (a[3] - a[1]) / 2, br = (a[2] - a[0]) / 2;
        var kosten = [
          [0.6 * (a[3] - s[1] + 1), 0, -(a[3] - s[1] + 1)],
          [a[2] - s[0] + 1, -(a[2] - s[0] + 1), 0],
          [s[2] - a[0] + 1, s[2] - a[0] + 1, 0],
          [1.4 * (s[3] - a[1] + 1), 0, s[3] - a[1] + 1]
        ];
        if (diepst.vorm.soort === 'seg' || diepst.rand) kosten.push([0, -dm.m.nx * (-dm.sep + 1), -dm.m.ny * (-dm.sep + 1)]);
        if (diepst.rand) kosten = [kosten[kosten.length - 1]];
        kosten.sort(function (x, y) { return x[0] - y[0]; });
        b.x += kosten[0][1]; b.y += kosten[0][2]; b.px = b.x; b.py = b.y;
        void h; void br;
      }
      werk(b, 0);
      return false;
    };

    // ---------- om te zien wat de motor ziet
    W.tekenDebug = function (ctx, ox, oy, kleur) {
      ctx.save(); ctx.translate(-ox, -oy); ctx.lineWidth = 1.5;
      function polyPad(g) { ctx.beginPath(); for (var i = 0; i < g.n; i++) { var x = g.wv[2 * i], y = g.wv[2 * i + 1]; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.closePath(); }
      ctx.strokeStyle = kleur.vast;
      for (var i = 0; i < this.vast.length; i++) { var S = this.vast[i]; if (S.rand) continue; polyPad(S.geo); ctx.stroke(); }
      for (i = 0; i < this.lichamen.length; i++) {
        var b = this.lichamen[i]; ctx.strokeStyle = b.slaap ? kleur.slaap : kleur.wakker;
        if (b.vorm.soort === 'cirkel') { ctx.beginPath(); ctx.arc(b.x, b.y, b.vorm.r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x + Math.cos(b.a) * b.vorm.r, b.y + Math.sin(b.a) * b.vorm.r); ctx.stroke(); }
        else { polyPad(b.geo); ctx.stroke(); }
        if (!b.slaap) { ctx.strokeStyle = kleur.snel; ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x + b.vx * 0.05, b.y + b.vy * 0.05); ctx.stroke(); }
      }
      ctx.fillStyle = kleur.contact;
      for (i = 0; i < this.contacten.length; i++) {
        var c = this.contacten[i];
        for (var k = 0; k < c.pts.length; k++) { var p = c.pts[k]; if (p.maxPn <= 0) continue; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, 7); ctx.fill(); ctx.beginPath(); ctx.strokeStyle = kleur.contact; ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - c.nx * 10, p.y - c.ny * 10); ctx.stroke(); }
      }
      ctx.restore();
    };

    return { Wereld: Wereld, cirkel: cirkel, poly: poly, doos: doos, botsing: botsing };
  })();
  // ==== FYSICA eind
  const RM = (function () {
    const K = 52 / 64;                       // tekening: px per eenheid van het viewBox
    const SLEUTEL = 'rommeltjes-v1';         // per apparaat, bewust niet in SLEUTELS (koppelen)
    const RUSTIG = minder;
    const DT = 1 / 120;
    const pk = lijst => lijst.map(p => [(p[0] - 32) * K, (p[1] - 32) * K]);
    const lees = () => { try { return JSON.parse(localStorage.getItem(SLEUTEL) || 'null') || {}; } catch (e) { return {}; } };
    const schrijf = v => { try { localStorage.setItem(SLEUTEL, JSON.stringify(v)); } catch (e) {} };
    let opslag = lees();

    // ---------- de tekeningen en de vormen
    const OOG = { tl: [22, 22], tr: [42, 22], ml: [22, 32], mr: [42, 32], c: [32, 32], bl: [22, 42], br: [42, 42] };
    const OGEN = { 1: ['c'], 2: ['tr', 'bl'], 3: ['tr', 'c', 'bl'], 4: ['tl', 'tr', 'bl', 'br'], 5: ['tl', 'tr', 'c', 'bl', 'br'], 6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'] };
    const GETAL = ['', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes'];
    const PL = [[-22.3, -6.9], [11.4, -6.9], [22.3, 0], [11.4, 6.9], [-22.3, 6.9]], PUNT = [22.3, 0];
    const rond = (r1, r2) => `<circle class="hit fijn" cx="32" cy="32" r="${r1}"/><circle class="hit grof" cx="32" cy="32" r="${r2}"/>`;
    const DEF = {
      knikker: { naam: 'Knikker', klank: 'glas', vorm: () => Fysica.cirkel(17.7, 0.4), dichtheid: 2.6, wrijving: 0.35, stuit: 0.5, rol: 160, dempA: 0.05,
        teken: () => '<circle cx="32" cy="32" r="20" fill="#7FB3E6" stroke="#231A26" stroke-width="3.5"/><path d="M18 36c6-10 18-12 28-4" fill="none" stroke="#C8323C" stroke-width="4" stroke-linecap="round"/><path d="M24 46c5 2 12 1 16-3" fill="none" stroke="#FFE76A" stroke-width="3" stroke-linecap="round"/>',
        sch: '<circle cx="32" cy="32" r="21.5"/>', hit: rond(23, 26),
        glans: n => `<defs><clipPath id="rm-kn${n}"><circle cx="32" cy="32" r="18.3"/></clipPath></defs><circle cx="25" cy="24" r="4.5" fill="#FFFFFF" opacity=".85"/><circle cx="39.5" cy="40" r="2" fill="#FFFFFF" opacity=".5"/><g clip-path="url(#rm-kn${n})"><rect class="streep" x="-12" y="0" width="9" height="64" fill="#FFFFFF" opacity="0" transform="rotate(25 32 32)"/></g>`,
        label: 'Knikker. Tik om hem weg te tikken, sleep om te gooien.' },
      dobbelsteen: { naam: 'Dobbelsteen', klank: 'plastic', vorm: () => Fysica.doos(38.6, 38.6, 7.3), dichtheid: 1.3, wrijving: 0.6, stuit: 0.32, vlak: true,
        teken: () => '<rect x="10" y="10" width="44" height="44" rx="9" fill="#FFFFFF" stroke="#231A26" stroke-width="3.5"/>' + [1, 2, 3, 4, 5, 6].map(n => `<g class="vlak${n}"${n === 5 ? '' : ' style="opacity:0"'}>${OGEN[n].map(o => `<circle cx="${OOG[o][0]}" cy="${OOG[o][1]}" r="4.2" fill="${o === 'c' ? '#C8323C' : '#231A26'}"/>`).join('')}</g>`).join(''),
        sch: '<rect x="8.2" y="8.2" width="47.6" height="47.6" rx="10"/>',
        hit: '<rect class="hit fijn" x="6" y="6" width="52" height="52" rx="11"/><rect class="hit grof" x="4" y="4" width="56" height="56" rx="13"/>',
        label: 'Dobbelsteen. Tik om te gooien.' },
      potlood: { naam: 'Potlood', klank: 'hout', vorm: () => Fysica.poly(PL), dichtheid: 0.75, wrijving: 0.5, stuit: 0.22,
        teken: () => '<rect x="12" y="25" width="34" height="14" fill="#F2C94C" stroke="#231A26" stroke-width="3"/><path d="M15 29.7h28" stroke="#E0A92E" stroke-width="2"/><path d="M46 25l12 7-12 7z" fill="#F4DCC2" stroke="#231A26" stroke-width="3" stroke-linejoin="round"/><path d="M54 29.7l4 2.3-4 2.3z" fill="#231A26"/><rect x="6" y="25" width="7" height="14" rx="2" fill="#E8577A" stroke="#231A26" stroke-width="3"/>',
        sch: '<path d="M4.5 23.5h42l13.5 8.5-13.5 8.5h-42z"/>',
        hit: '<path class="hit fijn" d="M2 20h45l16 12-16 12H2z"/><path class="hit grof" d="M-2 16h50l18 16-18 16H-2z"/>',
        label: 'Potlood. Sleep om te tekenen, tik voor een krabbel.' },
    };
    // ---------- de knipoogjes in de rommelkast: hebbedingetjes uit series en films, als eigen tekeningen
    // (geen namen, logo's of personages; een hamer, een kubus, een kopje ...). romp: de botsvorm (bol, in tekencoördinaten).
    const KNIPOOG = (function () {
      const I = '#231A26';
      const f1 = v => +v.toFixed(1);
      const pol = (cx, cy, r, a) => [f1(cx + Math.sin(a * Math.PI / 180) * r), f1(cy - Math.cos(a * Math.PI / 180) * r)];
      const steen = (x, y, kleur, i) => `<g class="rm-steen" style="--i:${i}"><path d="M${x - 5.5} ${y - 2.5}L${x - 2.5} ${y - 6}h5l3 3.5L${x} ${y + 6.5}z" fill="${kleur}" stroke="${I}" stroke-width="1.9" stroke-linejoin="round"/><path d="M${x - 5.5} ${y - 2.5}h11M${x - 2.5} ${y - 6}l1 3.5L${x} ${y + 6.5}M${x + 2.5} ${y - 6}l-1 3.5" fill="none" stroke="${I}" stroke-width=".9" opacity=".45"/><path d="M${x - 3.6} ${y - 3.8}l1.3-1.2" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity=".9"/></g>`;
      const K = {
        // ================= Marvel
        hamer: { naam: 'Hamer', serie: 'Marvel', zin: 'Probeer hem maar eens op te tillen.', klank: 'metaal', dichtheid: 30, wrijving: 0.8, stuit: 0.05,
          romp: [[26, 5], [39, 5], [54, 33], [54, 53], [47, 60], [11, 60], [11, 40], [19, 33]],
          svg: n => `<path d="M29.5 9.5c-3-4-10-4-11.5 0-1.6 4.5 2.5 9.5 9 12" fill="none" stroke="${I}" stroke-width="5.2" stroke-linecap="round"/>
            <path d="M29.5 9.5c-3-4-10-4-11.5 0-1.6 4.5 2.5 9.5 9 12" fill="none" stroke="#6B4426" stroke-width="2.4" stroke-linecap="round"/>
            <rect x="28" y="12" width="9" height="24" rx="1.5" fill="#7A4E2D" stroke="${I}" stroke-width="2.4"/>
            <path d="M28 16.5l9-2.4M28 21l9-2.4M28 25.5l9-2.4M28 30l9-2.4" stroke="#4E321C" stroke-width="2.2"/>
            <path d="M29.5 14v19" stroke="#A5754A" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>
            <rect x="26.5" y="6.5" width="12" height="6" rx="2" fill="#B8C0CA" stroke="${I}" stroke-width="2.2"/>
            <path d="M28.5 9h4" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round"/>
            <rect x="26.5" y="33" width="12" height="4" rx="1" fill="#8C939E" stroke="${I}" stroke-width="2"/>
            <path d="M11 40l8-7h35l-8 7z" fill="#C9D0D8" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <path d="M46 40l8-7v20l-8 7z" fill="#727C89" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <rect x="11" y="40" width="35" height="20" fill="#A3ACB7" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <path d="M14 44h29M14 56h29" stroke="#7D8794" stroke-width="1.6"/>
            <path d="M28.5 46.5l4 3.5-4 3.5-4-3.5z" fill="#8C939E" stroke="#5E6672" stroke-width="1.3"/>
            ${[[16, 50], [41, 50]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="1.3" fill="#5E6672"/>`).join('')}
            <path d="M14 42h12" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
            <path d="M48.5 41l3-2.6" stroke="#A3ACB7" stroke-width="1.3" stroke-linecap="round"/>` },
        kubus: { naam: 'Blauwe kubus', serie: 'Marvel', zin: 'Niet aankomen. Oké, één keer dan.', klank: 'glas', dichtheid: 1.6, wrijving: 0.5, stuit: 0.25,
          romp: [[12, 24], [20, 15], [53, 15], [53, 48], [45, 57], [12, 57]],
          svg: n => `<defs><radialGradient id="kb-g${n}"><stop offset="0" stop-color="#9FE8FF" stop-opacity=".55"/><stop offset="1" stop-color="#9FE8FF" stop-opacity="0"/></radialGradient></defs>
            <circle class="rm-gloed" cx="32" cy="36" r="31" fill="url(#kb-g${n})"/>
            <path d="M12 24l8-9h33l-8 9z" fill="#B7F0FF" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <path d="M45 24l8-9v33l-8 9z" fill="#1F7FC4" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <rect x="12" y="24" width="33" height="33" fill="#3FA9E6" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <rect x="16.5" y="28.5" width="24" height="24" rx="2" fill="none" stroke="#9BE3FF" stroke-width="1.6" opacity=".9"/>
            <path d="M22 46c3-7 6-11 13-14M20 37c5-1 8 2 11 6M33 47c1-4 4-6 8-7" fill="none" stroke="#E4FBFF" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
            <circle cx="28.5" cy="40.5" r="3.2" fill="#E4FBFF"/>
            <path d="M17 21.5l6-6.5h10" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M49 25v16" stroke="#58B9EE" stroke-width="1.5" stroke-linecap="round"/>
            ${[[7, 16], [58, 10], [59, 54], [5, 50]].map(p => `<path class="rm-gloed" d="M${p[0]} ${p[1] - 3}v6M${p[0] - 3} ${p[1]}h6" stroke="#58B9EE" stroke-width="1.5" stroke-linecap="round"/>`).join('')}` },
        stenen: { naam: 'Zes steentjes', serie: 'Marvel', zin: 'Zes steentjes. Eén knip.', klank: 'hout', dichtheid: 1.1, wrijving: 0.7, stuit: 0.15,
          romp: [[7, 36], [14, 28], [50, 28], [57, 36], [53, 50], [41, 60], [23, 60], [11, 50]],
          svg: n => `<ellipse cx="32" cy="36" rx="25" ry="7.5" fill="#4E2F19" stroke="${I}" stroke-width="2.4"/>
            ${steen(21, 34.5, '#3DBA6A', 0)}${steen(32, 33, '#8E5BD6', 1)}${steen(43, 34.5, '#F2C94C', 2)}${steen(16, 40.5, '#3F7FE0', 3)}${steen(32, 41.5, '#E0384A', 4)}${steen(48, 40.5, '#F08A2C', 5)}
            <path d="M7 36A25 7.5 0 0 0 57 36C57 47 46 55 32 55S7 47 7 36z" fill="#8A5B34" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <path d="M9.5 38.5A25 7.5 0 0 0 54.5 38.5" fill="none" stroke="#C08B55" stroke-width="2"/>
            <path d="M13 46c5 4 12 6 19 6M18 49.5c4 2 8 3 13 3" fill="none" stroke="#6B4426" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M12 42c1 3 3 5 5 6.5" fill="none" stroke="#B07A4A" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M24 54.5h16l2 5.5H22z" fill="#6B4426" stroke="${I}" stroke-width="2.2" stroke-linejoin="round"/>` },
        // ================= Back to the Future
        foto: { naam: 'Familiefoto', serie: 'Back to the Future', zin: 'Een familiefoto. Hij wordt wel steeds vager.', klank: 'hout', dichtheid: 0.7, wrijving: 0.6, stuit: 0.2,
          romp: [[12, 5], [52, 5], [52, 59], [12, 59]],
          svg: n => `<rect x="12" y="5" width="40" height="54" rx="2" fill="#B9834F" stroke="${I}" stroke-width="2.6"/>
            <path d="M12 5l5 5h30l5-5M12 59l5-5h30l5 5" fill="none" stroke="#8E5E36" stroke-width="1.5"/>
            <rect x="17" y="10" width="30" height="44" fill="#FBF6E9" stroke="${I}" stroke-width="1.8"/>
            <rect x="20" y="13" width="24" height="29" fill="#9CC4DE" stroke="${I}" stroke-width="1.4"/>
            <path d="M20 34c6-2 17-2 24 0v8H20z" fill="#86B06A"/>
            <path d="M33 34v-6l3-3 3 3v6" fill="#D9C8A8" stroke="${I}" stroke-width=".9"/>
            ${[[25, '#5A3820', '#C8323C', 0], [31.5, '#E9B949', '#2F6FB5', -1.5], [38, '#2B2733', '#E8833A', 0]].map((f, i) => `<g class="rm-kind" style="--i:${i}"><circle cx="${f[0]}" cy="${29 + f[3]}" r="2.6" fill="#F2C9A0" stroke="${I}" stroke-width="1"/><path d="M${f[0] - 2.8} ${28 + f[3]}a2.8 2.8 0 0 1 5.6 0" fill="${f[1]}" stroke="${I}" stroke-width="1"/><path d="M${f[0] - 3} ${39}v-4.5a3 3 0 0 1 6 0V${39}z" fill="${f[2]}" stroke="${I}" stroke-width="1" transform="translate(0 ${f[3]})"/></g>`).join('')}
            <path d="M21 48h12M21 51h8" stroke="#C9BFAE" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M20 13l6 0" stroke="#FFFFFF" stroke-width="1.2" opacity=".7"/>` },
        klok: { naam: 'Klokje op 10:04', serie: 'Back to the Future', zin: 'Hij staat stil sinds de bliksem insloeg.', klank: 'hout', dichtheid: 1.1, wrijving: 0.6, stuit: 0.15,
          romp: [[12, 28], [18, 14], [32, 8], [46, 14], [52, 28], [53, 60], [11, 60]],
          svg: n => `<path d="M12 58V28a20 20 0 0 1 40 0v30z" fill="#7A4E2D" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <path d="M16 54V28a16 16 0 0 1 32 0v26" fill="none" stroke="#5A3820" stroke-width="1.6"/>
            <circle cx="32" cy="28" r="14" fill="#E2C277" stroke="${I}" stroke-width="2"/>
            <circle cx="32" cy="28" r="11.5" fill="#FBF6E9" stroke="${I}" stroke-width="1.4"/>
            ${Array.from({ length: 12 }, (_, i) => { const a = pol(32, 28, i % 3 ? 9.8 : 8.6, i * 30), b = pol(32, 28, 10.8, i * 30); return `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="${I}" stroke-width="${i % 3 ? 1 : 1.8}" stroke-linecap="round"/>`; }).join('')}
            <g class="rm-uur" style="transform-origin:32px 28px;transform:rotate(302deg)"><path d="M32 29v-6.5" stroke="${I}" stroke-width="2.4" stroke-linecap="round"/></g>
            <g class="rm-min" style="transform-origin:32px 28px;transform:rotate(24deg)"><path d="M32 29.5v-9.5" stroke="${I}" stroke-width="1.6" stroke-linecap="round"/></g>
            <circle cx="32" cy="28" r="1.6" fill="#C8323C"/>
            <rect x="25.5" y="44.5" width="13" height="10" rx="2" fill="#2E1A10" stroke="${I}" stroke-width="1.8"/>
            <path d="M32 44.5v5" stroke="#E2C277" stroke-width="1.2"/><circle cx="32" cy="51" r="2.2" fill="#E2C277" stroke="${I}" stroke-width="1"/>
            <path d="M10 58h44v2.5H10z" fill="#5A3820" stroke="${I}" stroke-width="2" stroke-linejoin="round"/>
            <path d="M17.5 21a16 16 0 0 1 9-8" fill="none" stroke="#A5754A" stroke-width="1.8" stroke-linecap="round"/>
            <path class="rm-flitsje" d="M46 5l-5 8h4l-3 7 7-9h-4l3-6z" fill="#FFE76A" stroke="${I}" stroke-width="1.4" stroke-linejoin="round"/>` },
        meter: { naam: 'Snelheidsmeter', serie: 'Back to the Future', zin: 'Bij 88 gebeurt er iets.', klank: 'metaal', dichtheid: 1.4, wrijving: 0.6, stuit: 0.2,
          romp: [[10, 28], [17, 12], [32, 6], [47, 12], [54, 28], [47, 44], [43, 60], [21, 60], [17, 44]],
          svg: n => `<path d="M24 47h16l4 12H20z" fill="#3B3F48" stroke="${I}" stroke-width="2.2" stroke-linejoin="round"/>
            <path d="M17 59h30" stroke="${I}" stroke-width="3" stroke-linecap="round"/>
            <circle cx="32" cy="28" r="22" fill="#B8C0CA" stroke="${I}" stroke-width="2.6"/>
            <circle cx="32" cy="28" r="18" fill="#17191E" stroke="${I}" stroke-width="1.6"/>
            <path d="M16 18a22 22 0 0 1 12-9" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity=".8"/>
            ${Array.from({ length: 11 }, (_, i) => { const g = -125 + i * 25, a = pol(32, 28, i % 2 ? 14.2 : 13, g), b = pol(32, 28, 16, g); return `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="${i > 8 ? '#E8414E' : '#F6F2EA'}" stroke-width="${i % 2 ? 1.2 : 2}" stroke-linecap="round"/>`; }).join('')}
            <path d="M${pol(32, 28, 15.5, 100).join(' ')}A15.5 15.5 0 0 1 ${pol(32, 28, 15.5, 125).join(' ')}" fill="none" stroke="#E8414E" stroke-width="2.4"/>
            <g class="rm-naald" style="transform-origin:32px 28px;transform:rotate(-110deg)"><path d="M32 30.5V15" stroke="#F08A2C" stroke-width="2.2" stroke-linecap="round"/></g>
            <circle cx="32" cy="28" r="2.6" fill="#F6F2EA" stroke="${I}" stroke-width="1.2"/>
            <rect x="25" y="35" width="14" height="7.5" rx="1.5" fill="#3A0E12" stroke="#E8414E" stroke-width="1.2"/>
            <text x="32" y="41.3" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-weight="700" font-size="6.5" fill="#FF6B6B">88</text>` },
        // ================= Severance
        computer: { naam: 'Oude computer', serie: 'Severance', zin: 'De cijfers voelen eng. Niemand weet waarom.', klank: 'plastic', dichtheid: 1.2, wrijving: 0.7, stuit: 0.15,
          romp: [[8, 8], [56, 8], [56, 44], [60, 52], [60, 59], [4, 59], [4, 52], [8, 44]],
          svg: n => `<rect x="8" y="5" width="48" height="40" rx="6" fill="#D3DCCB" stroke="${I}" stroke-width="2.6"/>
            <path d="M11 41h42" stroke="#B8C2B0" stroke-width="2" stroke-linecap="round"/>
            <rect x="13" y="10" width="38" height="27" rx="4" fill="#0D2633" stroke="${I}" stroke-width="2"/>
            <g class="rm-cijfers" font-family="ui-monospace,Menlo,monospace" font-weight="700" font-size="4.6" fill="#7FE0F0">${['5 3 8 1 6 2', '9 0 4 7 2 8', '1 6 2 9 8 5', '4 8 7 3 5 0'].map((r, i) => `<text x="32" y="${16.5 + i * 5.6}" text-anchor="middle" letter-spacing=".25">${r}</text>`).join('')}</g>
            <rect x="23.5" y="19" width="12" height="11" rx="1.5" fill="none" stroke="#FFE76A" stroke-width="1" stroke-dasharray="1.6 1.2"/>
            <path d="M15.5 13c3-1 6-1.5 9-1.5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
            <circle cx="50" cy="41" r="1.5" fill="#7BE07B" stroke="${I}" stroke-width=".8"/>
            <path d="M8 46h48l4 6v7H4v-7z" fill="#BFC9B6" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M10 51h44M9 55h46" stroke="#93A08B" stroke-width="1.6" stroke-dasharray="3 1.6"/>` },
        wafel: { naam: 'Wafel', serie: 'Severance', zin: 'Wafelfeest! Voor het beste team van de verdieping.', klank: 'plof', dichtheid: 0.8, wrijving: 0.7, stuit: 0.1,
          romp: [[6, 47], [12, 39], [32, 34], [52, 39], [58, 47], [56, 58], [8, 58]],
          svg: n => `<defs><clipPath id="wf-c${n}"><ellipse cx="32" cy="43" rx="20.5" ry="9.5"/></clipPath><mask id="wf-m${n}"><rect x="0" y="0" width="64" height="64" fill="#FFFFFF"/>${[[50, 39], [53.5, 45], [47.5, 50]].map((b, i) => `<circle class="rm-hap rm-hap${i}" cx="${b[0]}" cy="${b[1]}" r="0" fill="#000000"/>`).join('')}</mask></defs>
            <ellipse cx="32" cy="54" rx="26" ry="5" fill="#FFFFFF" stroke="${I}" stroke-width="2.4"/>
            <ellipse cx="32" cy="53.2" rx="17" ry="2.6" fill="none" stroke="#DDD6CA" stroke-width="1.4"/>
            <g mask="url(#wf-m${n})"><ellipse cx="32" cy="46.5" rx="21.5" ry="9.5" fill="#B9782A" stroke="${I}" stroke-width="2.4"/>
            <ellipse cx="32" cy="43" rx="21.5" ry="9.5" fill="#E2A443" stroke="${I}" stroke-width="2.4"/>
            <g clip-path="url(#wf-c${n})" fill="#C2832F">${[0, 1, 2, 3, 4, 5].map(i => [0, 1, 2, 3].map(j => `<rect x="${12.5 + i * 7}" y="${35 + j * 4.3}" width="4.6" height="2.6" rx=".8"/>`).join('')).join('')}</g>
            <path d="M22 41.5l13-4 6 2.5-13 4z" fill="#FFF0A3" stroke="${I}" stroke-width="1.6" stroke-linejoin="round"/>
            <path d="M17 44c5 3 10 3 14 1s9-3 14-1" fill="none" stroke="#9A5418" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>
            <path d="M18 38.5c4-2 8-3 12-3" fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" opacity=".55"/></g>` },
        vingerval: { naam: 'Vingerval', serie: 'Severance', zin: 'Een cadeautje van de baas. Hoera.', klank: 'plastic', dichtheid: 0.5, wrijving: 0.8, stuit: 0.3,
          romp: [[4, 37], [8, 30], [56, 30], [60, 37], [60, 50], [56, 57], [8, 57], [4, 50]],
          svg: n => `<defs><clipPath id="vv-c${n}"><rect x="5" y="31" width="54" height="25" rx="12.5"/></clipPath></defs>
            <rect x="5" y="31" width="54" height="25" rx="12.5" fill="#E9C27A"/>
            <g clip-path="url(#vv-c${n})" stroke-width="3.2">${Array.from({ length: 12 }, (_, i) => `<path d="M${-6 + i * 7} 58l15-29" stroke="${i % 2 ? '#C8323C' : '#2E8B62'}"/><path d="M${-6 + i * 7} 29l15 29" stroke="#F6E2B3"/>`).join('')}
            <rect x="0" y="31" width="64" height="7" fill="#FFFFFF" opacity=".28"/><rect x="0" y="49" width="64" height="7" fill="#231A26" opacity=".14"/></g>
            <rect x="5" y="31" width="54" height="25" rx="12.5" fill="none" stroke="${I}" stroke-width="2.6"/>
            <ellipse cx="9.5" cy="43.5" rx="3" ry="9" fill="#8A5B34" stroke="${I}" stroke-width="1.8"/>
            <ellipse cx="54.5" cy="43.5" rx="3" ry="9" fill="#8A5B34" stroke="${I}" stroke-width="1.8"/>
            <ellipse cx="9.5" cy="43.5" rx="1.2" ry="5" fill="#4E2F19"/><ellipse cx="54.5" cy="43.5" rx="1.2" ry="5" fill="#4E2F19"/>` },
        // ================= Ted Lasso
        bordje: { naam: 'Bordje GELOOF', serie: 'Ted Lasso', zin: 'Hangt boven de deur van de kleedkamer.', klank: 'hout', dichtheid: 0.7, wrijving: 0.7, stuit: 0.15,
          romp: [[8, 10], [56, 10], [56, 46], [52, 60], [12, 60], [8, 46]],
          svg: n => { const bord = `<rect x="8" y="12" width="48" height="29" rx="1" fill="#F6D44A" stroke="${I}" stroke-width="2.4"/><path d="M10 14l44 0" stroke="#FFF2A8" stroke-width="1.4" opacity=".8"/><text x="32" y="31.5" text-anchor="middle" font-family="'Bricolage Grotesque',system-ui,sans-serif" font-weight="800" font-size="11.5" textLength="38" lengthAdjust="spacingAndGlyphs" fill="#2F5FA8">GELOOF</text><path d="M14 36c8 1.5 24 1.5 36 0" fill="none" stroke="#2F5FA8" stroke-width="1.6" stroke-linecap="round"/>`;
            return `<defs><clipPath id="bj-l${n}"><path d="M0 0H32L30 8 33 15 30 23 32 30 30 37 32 44V64H0z"/></clipPath><clipPath id="bj-r${n}"><path d="M64 0H32L30 8 33 15 30 23 32 30 30 37 32 44V64H64z"/></clipPath></defs>
            <path d="M20 40L14 60M44 40l6 20" stroke="${I}" stroke-width="5" stroke-linecap="round"/><path d="M20 40L14 60M44 40l6 20" stroke="#A5754A" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M32 8v-3" stroke="${I}" stroke-width="3" stroke-linecap="round"/>
            <g class="rm-helft rm-links" clip-path="url(#bj-l${n})">${bord}</g><g class="rm-helft rm-rechts" clip-path="url(#bj-r${n})">${bord}</g>
            <rect class="rm-plakker" x="28.5" y="19" width="7" height="17" rx="1" fill="#E8E2D6" fill-opacity=".5" stroke="${I}" stroke-width="1.2" opacity="0"/>
            <rect x="9" y="40.5" width="46" height="5" rx="1.5" fill="#B9834F" stroke="${I}" stroke-width="2.2"/>
            <rect x="4" y="9.5" width="11" height="5.5" rx="1" fill="#E8E2D6" fill-opacity=".9" stroke="${I}" stroke-width="1.2" transform="rotate(-28 9.5 12)"/>
            <rect x="49" y="9.5" width="11" height="5.5" rx="1" fill="#E8E2D6" fill-opacity=".9" stroke="${I}" stroke-width="1.2" transform="rotate(28 54.5 12)"/>`; } },
        koekjes: { naam: 'Koekjes voor de baas', serie: 'Ted Lasso', zin: 'Elke ochtend vers, voor de baas.', klank: 'plastic', dichtheid: 0.7, wrijving: 0.7, stuit: 0.15,
          romp: [[8, 34], [12, 10], [52, 10], [56, 34], [56, 58], [8, 58]],
          svg: n => `<g class="rm-deksel" style="transform-origin:32px 28px"><path d="M13 28l-1-18h40l-1 18z" fill="#F9CFDE" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/><path d="M16 25l-.6-12h33.2l-.6 12" fill="none" stroke="#F0A9C4" stroke-width="1.5"/></g>
            <path d="M8 34l5-6h38l5 6z" fill="#F7E9DE" stroke="${I}" stroke-width="2.2" stroke-linejoin="round"/>
            ${[15, 22, 29, 36, 43].map((x, i) => `<rect x="${x}" y="${21 + (i % 2)}" width="6.5" height="14" rx="1.5" fill="#E9C27A" stroke="${I}" stroke-width="1.5"/><circle cx="${x + 2}" cy="${25 + (i % 2)}" r=".7" fill="#B9853F"/><circle cx="${x + 4.5}" cy="${29 + (i % 2)}" r=".7" fill="#B9853F"/>`).join('')}
            <rect x="8" y="34" width="48" height="24" rx="2.5" fill="#F6B9CF" stroke="${I}" stroke-width="2.6"/>
            <path d="M8 34l-4 6h8M56 34l4 6h-8" fill="#F9CFDE" stroke="${I}" stroke-width="1.8" stroke-linejoin="round"/>
            <rect x="21" y="40" width="22" height="12" rx="2" fill="#FFFFFF" stroke="${I}" stroke-width="1.6"/>
            <path d="M25 44h14M25 47.5h9" stroke="#E894B4" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11 38v16" stroke="#F9D4E1" stroke-width="2" stroke-linecap="round"/>` },
        // ================= Dexter
        donutdoos: { naam: 'Doos donuts', serie: 'Dexter', zin: 'Hij neemt elke vrijdag donuts mee.', klank: 'plastic', dichtheid: 0.6, wrijving: 0.7, stuit: 0.15,
          romp: [[6, 36], [14, 8], [50, 8], [58, 36], [58, 58], [6, 58]],
          svg: n => `<path d="M12 28l2-20h36l2 20z" fill="#F6C3D6" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M16 12h32M15.5 17h33" stroke="#EE9DBD" stroke-width="2"/>
            <path d="M6 36l6-8h40l6 8z" fill="#EADBC8" stroke="${I}" stroke-width="2.2" stroke-linejoin="round"/>
            ${[[18, '#F28DB4'], [32, '#6B3A26'], [46, '#FFF3D6']].map((d, i) => `<g class="rm-donut${i === 1 ? ' rm-wip' : ''}"><ellipse cx="${d[0]}" cy="33" rx="7.5" ry="4.4" fill="#D49A5E" stroke="${I}" stroke-width="1.6"/><ellipse cx="${d[0]}" cy="32.2" rx="6" ry="3.2" fill="${d[1]}" stroke="${I}" stroke-width="1"/><ellipse cx="${d[0]}" cy="32.4" rx="2" ry="1.1" fill="#5A3820"/>${d[1] === '#F28DB4' ? `<path d="M${d[0] - 3.5} 31h1.5M${d[0] + 2} 30.5h1.5M${d[0] - 1} 34h1.5" stroke="#FFE76A" stroke-width="1" stroke-linecap="round"/>` : ''}</g>`).join('')}
            <rect x="6" y="36" width="52" height="22" rx="2.5" fill="#FFFFFF" stroke="${I}" stroke-width="2.6"/>
            <path d="M6 42.5h52M6 47h52" stroke="#E8577A" stroke-width="2.4"/>
            <circle cx="47" cy="52.5" r="3.2" fill="#FFE76A" stroke="${I}" stroke-width="1.4"/>
            <path d="M10 53h20" stroke="#F3D7E1" stroke-width="1.8" stroke-linecap="round"/>` },
        glaasjes: { naam: 'Kistje met glaasjes', serie: 'Dexter', zin: 'Gewoon een hobby. Echt.', klank: 'hout', dichtheid: 1.0, wrijving: 0.7, stuit: 0.15,
          romp: [[8, 36], [14, 8], [50, 8], [56, 36], [56, 58], [8, 58]],
          svg: n => `<path d="M12 30l2-22h36l2 22z" fill="#6E3B2A" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M16 27l1.6-15.5h28.8L48 27z" fill="#8E1F2A" stroke="#4E2A1D" stroke-width="1.4"/>
            <path d="M19 15c4-1 9-1 13-1" stroke="#B8424C" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M8 36l4-6h40l4 6z" fill="#2E170F" stroke="${I}" stroke-width="2.2" stroke-linejoin="round"/>
            ${[16, 23.5, 31, 38.5, 46].map((x, i) => `<g class="rm-glas${i === 2 ? ' rm-wip' : ''}"><rect x="${x - 2.8}" y="${i === 2 ? 17 : 19 + (i % 2) * 1.5}" width="5.6" height="22" rx=".8" fill="#DCEFF6" stroke="${I}" stroke-width="1.3"/><rect x="${x - 2.8}" y="${i === 2 ? 17 : 19 + (i % 2) * 1.5}" width="5.6" height="4" fill="#FFFFFF" stroke="${I}" stroke-width="1"/><circle cx="${x}" cy="${(i === 2 ? 17 : 19 + (i % 2) * 1.5) + 8.5}" r="1.6" fill="#C8323C"/></g>`).join('')}
            <rect x="8" y="36" width="48" height="22" rx="2" fill="#7A3E2C" stroke="${I}" stroke-width="2.6"/>
            <path d="M11 43c9-1.5 22-1.5 42 0M11 51c12 1 25 1 42-1" fill="none" stroke="#5E2E20" stroke-width="1.3" stroke-linecap="round"/>
            <rect x="28" y="39" width="8" height="8" rx="1.5" fill="#D9AE5B" stroke="${I}" stroke-width="1.5"/><path d="M32 41.5v3" stroke="${I}" stroke-width="1.4" stroke-linecap="round"/>
            ${[[8, 36], [52, 36], [8, 54], [52, 54]].map(p => `<rect x="${p[0]}" y="${p[1]}" width="4" height="4" rx=".6" fill="#D9AE5B" stroke="${I}" stroke-width="1"/>`).join('')}` },
        // ================= Hannibal
        kopje: { naam: 'Theekopje', serie: 'Hannibal', zin: 'Een mooi kopje. Laat het niet vallen.', klank: 'glas', dichtheid: 0.9, wrijving: 0.6, stuit: 0.2,
          romp: [[8, 26], [48, 22], [58, 30], [57, 46], [56, 59], [4, 59], [4, 52]],
          svg: n => `<path class="rm-damp rm-gloed" d="M24 18c-3-4 3-6 0-10M33 17c-3-4 3-6 0-10" fill="none" stroke="#C9C3B8" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>
            <ellipse cx="30" cy="55" rx="26" ry="5" fill="#FFFFFF" stroke="${I}" stroke-width="2.4"/>
            <ellipse cx="30" cy="54" rx="14" ry="2.4" fill="none" stroke="#3F6FB0" stroke-width="1.2"/>
            <path d="M46 29c8-2 11 3 10 7.5s-6.5 7.5-12 6.5" fill="none" stroke="${I}" stroke-width="6.2" stroke-linecap="round"/>
            <path d="M46 29c8-2 11 3 10 7.5s-6.5 7.5-12 6.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M10 25h40c0 15-7 27-20 27S10 40 10 25z" fill="#FFFFFF" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
            <ellipse cx="30" cy="25" rx="20" ry="4.6" fill="#8B5A2B" stroke="${I}" stroke-width="2.2"/>
            <ellipse cx="30" cy="25" rx="20" ry="4.6" fill="none" stroke="#E2C277" stroke-width="1.2"/>
            <path d="M15.5 33c3 1 4 4 7 3M28 40c2-2 5-1 6-3M38.5 32c1 2 3 3 4.5 2" fill="none" stroke="#3F6FB0" stroke-width="1.6" stroke-linecap="round"/>
            ${[[19, 35.5, 1.6], [32, 41, 1.6], [43, 34.5, 1.4], [24, 44, 1.1], [37, 46, 1.1]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="#3F6FB0"/>`).join('')}
            <path d="M13.5 31c1 4 2.5 8 5 10.5" fill="none" stroke="#ECE7DE" stroke-width="2" stroke-linecap="round"/><path class="rm-barst rm-gloed" d="M27 29.5l3 5-4 4.5 3.5 4-2 6M30 34.5l5 1.5 2 4.5M26 39l-5 1" fill="none" stroke="${I}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
            <path d="M46 53l11-6" stroke="${I}" stroke-width="3.6" stroke-linecap="round"/><path d="M46 53l11-6" stroke="#C9CED6" stroke-width="1.6" stroke-linecap="round"/>` },
        hert: { naam: 'Zwart hertje', serie: 'Hannibal', zin: 'Het kijkt je aan. Altijd.', klank: 'hout', dichtheid: 1.2, wrijving: 0.7, stuit: 0.15,
          romp: [[10, 52], [26, 26], [36, 4], [58, 8], [58, 30], [54, 60], [10, 60]],
          svg: n => `<path d="M40 22c-5-5-5-11-2-16M39.5 13.5c3-1.5 5-4 5-7.5M38.5 17c-3-.5-5.5-2.5-6.5-5.5M44 21.5c3-5 7-8 12.5-9M50.5 14.5c1-3 .5-6-1.5-8.5M51.5 15c3 0 5.5-1 7-3.5M55.5 13c1.5 1 2.5 2.5 2.5 4.5" fill="none" stroke="${I}" stroke-width="4" stroke-linecap="round"/>
            <path d="M40 22c-5-5-5-11-2-16M39.5 13.5c3-1.5 5-4 5-7.5M38.5 17c-3-.5-5.5-2.5-6.5-5.5M44 21.5c3-5 7-8 12.5-9M50.5 14.5c1-3 .5-6-1.5-8.5M51.5 15c3 0 5.5-1 7-3.5M55.5 13c1.5 1 2.5 2.5 2.5 4.5" fill="none" stroke="#5E5670" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M17 36c1-6 8-8.5 16-8.5 3.5 0 5.5-1.5 6.5-4.5l3-3.5c2.5 0 4.5 1 5.5 3.5l-2 2.5c-1 3-3 5-4.2 7.5 1 4.5 0 8.5-3 10.5V53h-3.3V44c-3.8.8-7.6.8-11.4 0v9h-3.3v-9.5C18.5 42 17 39.5 17 36z" fill="#3A3444" stroke="${I}" stroke-width="2" stroke-linejoin="round"/><path d="M19.5 33.5c2-3.5 7-5 13.5-5 4 0 6.3-1.6 7.4-4.6l2.2-2.6" fill="none" stroke="#7A7190" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M17.5 37c-2.5 0-4-1.5-4-4" fill="none" stroke="#3A3444" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M22 33c2-1.5 4-2 6-2M23 37.5c2.5-1 5-1.5 7.5-1.5M30 33.5c2-1 4-1.2 6-1" fill="none" stroke="#5E5670" stroke-width="1.3" stroke-linecap="round"/>
            <circle cx="45" cy="23.5" r="1.1" fill="#F6F2EA"/><circle class="rm-oog rm-gloed" cx="45" cy="23.5" r="1.9" fill="#FF4A55" opacity="0"/>
            <rect x="10" y="53" width="44" height="7" rx="2" fill="#7A4E2D" stroke="${I}" stroke-width="2.4"/>
            <rect x="26" y="55" width="12" height="3" rx=".8" fill="#D9AE5B" stroke="${I}" stroke-width=".9"/>` },
      };
      return K;
    })();
    const KAST_RIJ = [['hamer', 'kubus', 'stenen'], ['klok', 'foto', 'meter'], ['computer', 'wafel', 'vingerval'], ['bordje', 'koekjes', 'donutdoos'], ['glaasjes', 'kopje', 'hert']];
    const KAST_ALLES = [].concat.apply([], KAST_RIJ);
    // een bolle vorm iets groter maken (voor waar je hem kunt pakken)
    function uitzet(romp, d) {
      let cx = 0, cy = 0; romp.forEach(p => { cx += p[0]; cy += p[1]; }); cx /= romp.length; cy /= romp.length;
      return romp.map(p => { const dx = p[0] - cx, dy = p[1] - cy, l = Math.hypot(dx, dy) || 1; return (p[0] + dx / l * d).toFixed(1) + ',' + (p[1] + dy / l * d).toFixed(1); }).join(' ');
    }
    const zonderDefs = s => s.replace(/<defs>[\s\S]*?<\/defs>/g, '').replace(/ (clip-path|mask)="url\(#[^)]*\)"/g, '');
    KAST_ALLES.forEach(id => {
      const k = KNIPOOG[id];
      DEF[id] = { naam: k.naam, serie: k.serie, zin: k.zin, klank: k.klank, knipoog: true, vorm: () => Fysica.poly(pk(k.romp)), dichtheid: k.dichtheid, wrijving: k.wrijving, stuit: k.stuit,
        teken: k.svg, schVan: n => zonderDefs(k.svg(n + 's')),
        hit: `<polygon class="hit fijn" points="${uitzet(k.romp, 2.5)}"/><polygon class="hit grof" points="${uitzet(k.romp, 7)}"/>`,
        label: `${k.naam}, uit ${k.serie}. ${k.zin} Tik voor een verrassing, sleep om te verplaatsen.` };
    });
    const BRIEF = ['knikker', 'dobbelsteen', 'potlood'];

    const wereld = new Fysica.Wereld({ g: 2600 });
    let laag = null, lijnen = null, docB = 0, docH = 0, vloerY = 0;
    const rommels = [], planken = {};
    const tel = {};

    // ---------- geluid (Web Audio; pas na de eerste aanraking, nooit bij het openen)
    const Klank = (function () {
      let ctx = null, hoofd = null, ruis = null, aan = opslag.g !== 0;
      const laatst = {}, lussen = {};
      function start() {
        if (!aan) return;
        if (ctx) { if (ctx.state === 'suspended') { try { ctx.resume().catch(() => {}); } catch (e) {} } return; }
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        try { ctx = new AC(); if (ctx.resume) ctx.resume().catch(() => {}); } catch (e) { ctx = null; return; }
        hoofd = ctx.createGain(); hoofd.gain.value = 0.5; hoofd.connect(ctx.destination);
        const n = ctx.sampleRate, buf = ctx.createBuffer(1, n, n), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        ruis = buf;
      }
      const klaar = () => ctx && aan && ctx.state === 'running';
      function env(g, t, piek, duur) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, piek), t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + duur); }
      function toon(f, piek, duur, type, eind, na) { const t = ctx.currentTime + (na || 0), o = ctx.createOscillator(), g = ctx.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (eind) o.frequency.exponentialRampToValueAtTime(eind, t + duur); env(g, t, piek, duur); o.connect(g); g.connect(hoofd); o.start(t); o.stop(t + duur + 0.03); }
      function sis(f, q, piek, duur, soort) { const t = ctx.currentTime, s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = ruis; s.playbackRate.value = 0.8 + Math.random() * 0.4; fl.type = soort || 'bandpass'; fl.frequency.value = f; fl.Q.value = q; env(g, t, piek, duur); s.connect(fl); fl.connect(g); g.connect(hoofd); s.start(t, Math.random() * 0.5); s.stop(t + duur + 0.03); }
      function tik(soort, sterkte, wie) {
        if (!klaar()) return;
        const nu = ctx.currentTime, k = wie || soort; if (laatst[k] && nu - laatst[k] < 0.045) return; laatst[k] = nu;
        const v = Math.min(1, sterkte / 1100), r = 0.92 + Math.random() * 0.16;
        if (v < 0.03) return;
        if (soort === 'glas') { toon(2650 * r, 0.3 * v, 0.11); toon(2650 * r * 2.76, 0.11 * v, 0.06); }
        else if (soort === 'plastic') { sis(2300 * r, 1.4, 0.45 * v, 0.04); toon(1150 * r, 0.11 * v, 0.03, 'triangle'); }
        else if (soort === 'hout') { sis(950 * r, 1.8, 0.42 * v, 0.055); toon(420 * r, 0.13 * v, 0.045, 'triangle'); }
        else if (soort === 'metaal') { toon(3300 * r, 0.16 * v, 0.07); toon(5100 * r, 0.07 * v, 0.05); sis(6500, 1, 0.12 * v, 0.03, 'highpass'); }
        else if (soort === 'plof') { toon(170 * r, 0.28 * v, 0.1, 'sine', 80); sis(500, 0.7, 0.16 * v, 0.06, 'lowpass'); }
        else if (soort === 'gooi') toon(620 * r, 0.06, 0.08, 'sine', 1300);
        else if (soort === 'boing') toon(180 * (wie || 1), 0.16 * Math.max(0.4, v), 0.22, 'triangle', 420 * (wie || 1));
        else if (soort === 'fonkel') [1568, 2093, 2637, 3136].forEach((f, i) => toon(f * r, 0.05, 0.16, 'sine', 0, i * 0.055));
        else if (soort === 'krabbel') sis(3200, 0.9, 0.05, 0.05);
        else if (soort === 'donder') { sis(160, 0.6, 0.55 * v, 0.75, 'lowpass'); toon(68, 0.22 * v, 0.6, 'sine', 38); }
        else if (soort === 'knip') { sis(3600, 2.5, 0.6 * v, 0.035); toon(1700, 0.06 * v, 0.03, 'square'); }
        else if (soort === 'zap') { toon(320, 0.07, 0.28, 'sawtooth', 1900); toon(1500, 0.05, 0.22, 'sine', 420); }
        else if (soort === 'zoef') toon(140, 0.06, 1.0, 'sawtooth', 1300);
        else if (soort === 'knal') { sis(420, 0.5, 0.7 * v, 0.4, 'lowpass'); toon(95, 0.28 * v, 0.32, 'sine', 40); }
        else if (soort === 'klik') sis(5200, 4, 0.3 * v, 0.016);
        else if (soort === 'hap') { sis(1500, 0.8, 0.5 * v, 0.09); sis(800, 1.2, 0.32 * v, 0.07); }
        else if (soort === 'scheur') { sis(2300, 0.6, 0.45 * v, 0.28); sis(1200, 0.8, 0.25 * v, 0.2); }
        else if (soort === 'plak') sis(1100, 1, 0.3 * v, 0.14);
        else if (soort === 'tink') { toon(3150 * r, 0.14 * v, 0.4); toon(4700 * r, 0.05 * v, 0.28); }
        else if (soort === 'ding') { toon(1320, 0.09, 0.45); toon(1980, 0.04, 0.55, 'sine', 0, 0.02); }
        else if (soort === 'brom') toon(92, 0.16 * v, 0.9, 'triangle', 62);
      }
      // aanhoudend: het krassen van het potlood en het rollen van de knikker
      function lus(naam, maak) { if (!lussen[naam]) lussen[naam] = maak(); return lussen[naam]; }
      function ruisLus(f, q, typ) { const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = ruis; s.loop = true; fl.type = typ; fl.frequency.value = f; fl.Q.value = q; g.gain.value = 0.0001; s.connect(fl); fl.connect(g); g.connect(hoofd); s.start(); return { g, fl }; }
      function zet(naam, gain, maak, f) {
        if (!ctx) return;
        const l = lussen[naam] || (gain > 0.001 && klaar() ? lus(naam, maak) : null); if (!l) return;
        l.g.gain.setTargetAtTime(klaar() ? Math.max(0.0001, gain) : 0.0001, ctx.currentTime, 0.04);
        if (f && l.o) l.o.frequency.setTargetAtTime(f, ctx.currentTime, 0.05);
      }
      return {
        start, tik,
        krassen: v => zet('kras', Math.min(0.12, v / 2500 * 0.12), () => ruisLus(3400, 0.7, 'bandpass')),
        rollen: v => zet('rol', v > 25 ? Math.min(0.2, v / 900 * 0.2) : 0, () => ruisLus(320, 0.6, 'lowpass')),
        get aan() { return aan; },
        zetAan(b) { aan = b; if (b) start(); else if (ctx) Object.keys(lussen).forEach(k => { lussen[k].g.gain.value = 0.0001; }); }
      };
    })();
    let trilKlok = 0;
    function tril(ms) { const nu = performance.now(); if (nu - trilKlok < 120) return; trilKlok = nu; try { if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(ms); } catch (e) {} }

    // ---------- een rommeltje maken
    function maak(soort, plek, nr) {
      const d = DEF[soort], el = document.createElement('button'), n = rommels.length;
      el.type = 'button'; el.className = 'tg-rommel' + (d.knipoog ? ' rm-knipoog' : ''); el.dataset.rommel = soort; el.setAttribute('aria-label', d.label);
      el.innerHTML = `<span class="rm-sch${d.knipoog ? ' rm-vol' : ''}" aria-hidden="true"><svg viewBox="0 0 64 64">${d.knipoog ? d.schVan(n) : d.sch}</svg></span><span class="rm-draai" aria-hidden="true"><svg viewBox="0 0 64 64"><g class="tek">${d.teken(n)}</g>${d.hit}</svg></span>` + (d.glans ? `<span class="rm-glans" aria-hidden="true"><svg viewBox="0 0 64 64">${d.glans(n)}</svg></span>` : '');
      laag.appendChild(el);
      const b = wereld.lichaam({ vorm: d.vorm(), dichtheid: d.dichtheid, wrijving: d.wrijving, stuit: d.stuit, rol: d.rol, dempA: d.dempA, vlak: d.vlak, soort, x: -300, y: -300, slaap: true });
      const r = { id: soort + nr, soort, plek, d, el, b, sch: el.querySelector('.rm-sch'), draai: el.querySelector('.rm-draai'), lift: 0, liftDoel: 0, face: 5, draaiSom: 0, gerold: false, zessen: 0, weg: false, getoond: '', td: '', ts: '' };
      b.data.r = r; b.data.st0 = d.stuit;
      rommels.push(r); koppel(r);
      return r;
    }

    // ---------- de wereld: wat er vast op de pagina staat
    function hoekVan(el) { const t = getComputedStyle(el).transform; if (!t || t === 'none') return 0; const m = t.match(/matrix\(([^)]+)\)/); if (!m) return 0; const v = m[1].split(',').map(parseFloat); return Math.atan2(v[1], v[0]); }
    // een gedraaide rechthoek (de randen van het element, met afgeschuinde hoeken), in documentcoördinaten
    function vastVan(el, o) {
      const q = el.getBoundingClientRect(); if (!q.width || !q.height) return null;
      const w = o.w || el.offsetWidth || q.width, h = o.h || el.offsetHeight || q.height, a = o.hoek != null ? o.hoek : hoekVan(el);
      const cx = (o.cx != null ? o.cx : q.left + q.width / 2) + scrollX, cy = (o.cy != null ? o.cy : q.top + q.height / 2) + scrollY;
      const x = w / 2, y = h / 2, c = Math.min(o.schuin || 0, x * 0.3, y * 0.3), co = Math.cos(a), si = Math.sin(a);
      const p = c > 0.5 ? [[-x + c, -y], [x - c, -y], [x, -y + c], [x, y - c], [x - c, y], [-x + c, y], [-x, y - c], [-x, -y + c]] : [[-x, -y], [x, -y], [x, y], [-x, y]];
      return wereld.vastVeelhoek(p.map(v => [cx + co * v[0] - si * v[1], cy + si * v[0] + co * v[1]]), { wrijving: o.wrijving || 0.6, el: o.el || el, rand: o.rand, data: { naam: o.naam, klank: o.klank || 'plof', anker: o.anker, tik: o.tik } });
    }
    // de sticker: een ovaal om het hoofd (de hoeken van het plaatje zijn doorzichtig)
    function stickerVast(el) {
      const q = el.getBoundingClientRect(); if (!q.width) return;
      const w = el.offsetWidth, h = el.offsetHeight, a = hoekVan(el), cx0 = q.left + q.width / 2 + scrollX, cy0 = q.top + q.height / 2 + scrollY;
      const co = Math.cos(a), si = Math.sin(a), mx = 0, my = -0.06 * h, rx = 0.42 * w, ry = 0.38 * h, p = [];
      for (let i = 0; i < 14; i++) { const t = i / 14 * Math.PI * 2, lx = mx + rx * Math.cos(t), ly = my + ry * Math.sin(t); p.push([cx0 + co * lx - si * ly, cy0 + si * lx + co * ly]); }
      wereld.vastVeelhoek(p, { wrijving: 0.5, el, data: { naam: 'sticker', klank: 'plof', anker: 'sticker' } });
    }
    function rect(el) { const q = el.getBoundingClientRect(); return { l: q.left + scrollX, t: q.top + scrollY, r: q.right + scrollX, b: q.bottom + scrollY, w: q.width, h: q.height }; }
    // het plankje naast het briefje (of naast de kop Alle spellen)
    function plank(sleutel) {
      if (!planken[sleutel]) { const p = document.createElement('div'); p.className = 'rm-plank'; p.setAttribute('aria-hidden', 'true'); p.innerHTML = '<i class="l"></i><i class="r"></i>'; laag.insertBefore(p, laag.firstChild); planken[sleutel] = p; }
      return planken[sleutel];
    }
    // is er naast het briefje plek voor het plankje? (anders: naast de kop Alle spellen)
    function breed() { const main = $('main'), brief = $('.briefje'); if (!main || !brief) return false; const m = rect(main), br = rect(brief); return docB >= 700 && m.r - 24 - (br.r + 40) >= 190; }
    function zetPlanken(naastBrief) {
      const main = $('main'), brief = $('.briefje'), kop = $('#tg-kop span');
      if (!main) return;
      const m = rect(main), br = brief ? rect(brief) : null, kr = kop ? rect(kop) : null;
      let x0, x1, y;
      if (br && naastBrief) { x0 = br.r + 40; x1 = Math.min(m.r - 24, x0 + 300); y = br.t + br.h * 0.42; }
      else if (kr) { x0 = kr.r + 14; x1 = Math.min(m.r - 8, x0 + 260); y = kr.b - 2; }
      const pb = plank('brief');
      if (x0 != null && x1 - x0 >= 130) { pb.hidden = false; pb.style.transform = `translate(${x0.toFixed(1)}px,${y.toFixed(1)}px)`; pb.style.width = (x1 - x0).toFixed(1) + 'px'; pb.dataset.x0 = x0; pb.dataset.y = y; pb.dataset.w = x1 - x0; }
      else pb.hidden = true;
    }

    // ---------- de rommelkast: in de linker kantlijn als daar ruimte is (de hoge advertentie staat rechts),
    // anders als kast in de pagina, tussen de advertentie en Alle spellen. Maten in px.
    const KAST = { cel: 58, wand: 13, binnen: 20, vak: 72, plank: 10, voet: 8 };
    let kastEl = null, kastSec = null, kastSig = '', kastMaat = null;
    function kastTeken(cols, cel) {
      const rijen = Math.ceil(KAST_ALLES.length / cols), w = cols * cel + 2 * KAST.wand, h = KAST.binnen + rijen * (KAST.vak + KAST.plank) + KAST.voet, sig = cols + ':' + cel;
      if (kastEl.dataset.sig !== sig) {
        kastEl.dataset.sig = sig; kastEl.style.width = w + 'px'; kastEl.style.height = h + 'px';
        let html = '<span class="rm-kast-kast"></span><span class="rm-kast-achter"></span>';
        for (let i = 0; i < rijen; i++) html += `<span class="rm-kast-plank" style="top:${KAST.binnen + KAST.vak + i * (KAST.vak + KAST.plank)}px"></span>`;
        kastEl.innerHTML = html + '<span class="rm-kast-voet l"></span><span class="rm-kast-voet r"></span><span class="rm-kast-kroon"></span><span class="rm-kast-tape">Rommelkast</span>';
      }
      return { cols, cel, rijen, w, h };
    }
    function zetKast() {
      const main = $('main'); if (!main || !kastEl) return null;
      kastSec.hidden = true;
      const m = rect(main), ruimte = m.l + 24, boven = $('#vandaag') || $('.tg-reclame') || $('#spellen');
      if (ruimte >= 208 && boven) {
        const k = kastTeken(3, Math.max(52, Math.min(KAST.cel, Math.floor((ruimte - 46) / 3))));
        if (kastEl.parentNode !== document.body) document.body.appendChild(kastEl);
        kastEl.classList.add('rm-zij');
        kastEl.style.transform = `translate(${Math.round((ruimte - k.w) / 2)}px,${Math.round(rect(boven).t + 26)}px)`;
        k.modus = 'zij'; return k;
      }
      kastSec.hidden = false; kastEl.classList.remove('rm-zij'); kastEl.style.transform = '';
      if (kastEl.parentNode !== kastSec) kastSec.appendChild(kastEl);
      const bw = kastSec.clientWidth || m.w - 48, cols = Math.max(3, Math.min(8, Math.floor((bw - 26) / KAST.cel))), cel = Math.min(84, Math.floor((bw - 26) / cols));
      const k = kastTeken(cols, cel); k.modus = 'plank'; return k;
    }
    // de bovenkant van iets vasts onder x (ook als het een beetje scheef staat)
    function topVan(s, x) {
      const g = s.geo;
      for (let i = 0; i < g.n; i++) { const j = (i + 1) % g.n, ax = g.wv[2 * i], ay = g.wv[2 * i + 1], bx = g.wv[2 * j], by = g.wv[2 * j + 1]; if (g.wn[2 * i + 1] < -0.5 && (ax - x) * (bx - x) <= 0 && ax !== bx) return ay + (by - ay) * (x - ax) / (bx - ax); }
      return s.aabb[1];
    }
    // waar een rommeltje thuishoort: op het plankje naast het briefje, of op zijn plek in de kast
    function thuis(r) {
      if (r.plek === 'brief') return legOp(r, 'plank:brief', [0.2, 0.5, 0.8][BRIEF.indexOf(r.soort)]);
      const k = kastMaat; if (!k) return false;
      const i = KAST_ALLES.indexOf(r.soort), rij = Math.floor(i / k.cols), j = i % k.cols, n = Math.min(k.cols, KAST_ALLES.length - rij * k.cols);
      const s = ankerVast('kast' + k.cols + ':' + rij); if (!s) return false;
      const x = s.aabb[0] + (k.cols - n) * k.cel / 2 + k.cel * (j + 0.5);
      opRust(r, x + r.b.vorm.ox, topVan(s, x), 0); return true;
    }
    function draagVlak(b) {
      for (const s of wereld.vast) { if (s.data.lijn || !s.el) continue; const m = Fysica.botsing(b, s, 4); if (m && m.ny > 0.4) return s; }
      return null;
    }
    function steunt(b) {
      wereld.werk(b);
      for (const s of wereld.vast.concat(wereld.lichamen)) { if (s === b || (s.data && s.data.r && s.data.r.weg)) continue; const m = Fysica.botsing(b, s, 3); if (m && m.ny > 0.4) return true; }
      return false;
    }
    function bouwWereld() {
      const oud = rommels.filter(r => !r.weg).map(r => { const s = draagVlak(r.b); return s ? [r, s.el, s.aabb[0], s.aabb[1], s.data.kast != null] : null; }).filter(Boolean);
      docB = document.documentElement.clientWidth;
      const voet = $('footer'), main = $('main');
      const vb = voet ? rect(voet) : null, mb = main ? rect(main) : { b: document.documentElement.scrollHeight };
      vloerY = vb && vb.h ? vb.t : mb.b; docH = vb && vb.h ? vb.b : mb.b + 40;
      laag.style.width = docB + 'px'; laag.style.height = docH + 'px';
      lijnen.setAttribute('width', docB); lijnen.setAttribute('height', docH);
      const naastBrief = breed(); plaatsKnopjes(naastBrief);
      // eerst de kast (die kan de pagina eronder verschuiven), dan het plankje en de hoge advertentie
      const k = zetKast(), sig = k ? k.modus + k.cols + ':' + k.cel : '', anders = !!kastSig && sig !== kastSig; kastSig = sig; kastMaat = k;
      zetPlanken(naastBrief); plaatsHoog();
      wereld.leegVast(s => !s.data.lijn);
      wereld.vastDoos(-600, -600, 0, docH + 600, { rand: true, data: { naam: 'muur' } });
      wereld.vastDoos(docB, -600, docB + 600, docH + 600, { rand: true, data: { naam: 'muur' } });
      wereld.vastDoos(-600, -600, docB + 600, 0, { rand: true, data: { naam: 'plafond' } });
      wereld.vastDoos(-600, vloerY, docB + 600, vloerY + 800, { rand: true, wrijving: 0.7, el: voet || document.body, data: { naam: 'vloer', klank: 'plof', anker: 'vloer' } });
      const zichtbaar = el => el && el.getClientRects().length > 0;
      document.querySelectorAll('.held h1 .tape').forEach((el, i) => vastVan(el, { schuin: 3, naam: 'tape', anker: 'tape' + i }));
      const st = $('.sticker'); if (zichtbaar(st) && getComputedStyle(st).visibility !== 'hidden') stickerVast(st);
      const brief = $('.briefje'); if (zichtbaar(brief)) vastVan(brief, { schuin: 3, naam: 'briefje', anker: 'briefje', tik: true });
      const blad = $('.tg-blad'); if (zichtbaar(blad)) vastVan(blad, { schuin: 6, naam: 'blad', anker: 'blad', tik: true });
      const cas = $('.tg-cas-bord'); if (zichtbaar(cas)) vastVan(cas, { schuin: 12, hoek: 0, naam: 'casino', anker: 'casino' });
      // de advertenties (die rouleren, dus het blok hangt aan de vaste plek eromheen)
      const rb = $('.tg-reclame'), ra = rb && rb.querySelector('.ra'); if (zichtbaar(ra)) vastVan(ra, { hoek: 0, naam: 'reclame', anker: 'reclame', el: rb });
      const rh = reclameHoog, rha = rh && !rh.hidden && rh.querySelector('.ra'); if (zichtbaar(rha)) vastVan(rha, { hoek: 0, naam: 'reclame', anker: 'reclame-hoog', el: rh });
      document.querySelectorAll('#vandaag .tg-dk').forEach((el, i) => vastVan(el, { schuin: 8, hoek: 0, naam: 'dag', anker: 'dag' + i, tik: true }));
      const kop = $('#tg-kop span'); if (zichtbaar(kop)) vastVan(kop, { schuin: 2, naam: 'kop', anker: 'kop' });
      // tegels: de plek van het vlak zonder het optillen bij aanwijzen (dat zit op het vlak zelf)
      document.querySelectorAll('.tg-raster .tg-tegel').forEach(a => {
        if (a.hidden) return; const v = a.querySelector('.tg-vlak'); if (!v) return;
        const q = a.getBoundingClientRect(); if (!q.width) return;
        vastVan(v, { schuin: 9, hoek: 0, w: v.offsetWidth, h: v.offsetHeight, cx: q.left + v.offsetWidth / 2, cy: q.top + v.offsetHeight / 2, el: a, naam: 'tegel', anker: 'tegel:' + a.getAttribute('href'), tik: true });
      });
      const coul = $('.coulissen'); if (zichtbaar(coul)) vastVan(coul, { schuin: 0, hoek: 0, naam: 'coulissen', anker: 'coulissen' });
      for (const k in planken) {
        const p = planken[k]; if (p.hidden) continue;
        const x0 = +p.dataset.x0, y = +p.dataset.y, w = +p.dataset.w;
        wereld.vastDoos(x0, y, x0 + w, y + 12, { schuin: 2, wrijving: 0.7, el: p, data: { naam: 'plank', klank: 'hout', anker: 'plank:' + k } });
        // opstaande randjes aan de uiteinden, zodat er niets zomaar af rolt
        wereld.vastDoos(x0 - 2.5, y - 10, x0 + 4.5, y + 1, { schuin: 1.5, wrijving: 0.6, data: { naam: 'randje', klank: 'hout' } });
        wereld.vastDoos(x0 + w - 4.5, y - 10, x0 + w + 2.5, y + 1, { schuin: 1.5, wrijving: 0.6, data: { naam: 'randje', klank: 'hout' } });
      }
      // de kast: een bovenkant om iets op te leggen, twee zijwanden en de planken
      if (kastMaat) {
        const q = rect(kastEl), x0 = q.l, y0 = q.t, w = kastMaat.w, h = kastMaat.h;
        wereld.vastDoos(x0 - 6, y0, x0 + w + 6, y0 + KAST.binnen, { schuin: 2, wrijving: 0.7, el: kastEl.querySelector('.rm-kast-kroon'), data: { naam: 'kast', klank: 'hout', anker: 'kast-top' } });
        wereld.vastDoos(x0, y0 + 12, x0 + KAST.wand, y0 + h, { wrijving: 0.6, data: { naam: 'kastwand', klank: 'hout' } });
        wereld.vastDoos(x0 + w - KAST.wand, y0 + 12, x0 + w, y0 + h, { wrijving: 0.6, data: { naam: 'kastwand', klank: 'hout' } });
        kastEl.querySelectorAll('.rm-kast-plank').forEach((p, i) => {
          const y = y0 + KAST.binnen + KAST.vak + i * (KAST.vak + KAST.plank);
          wereld.vastDoos(x0 + KAST.wand, y, x0 + w - KAST.wand, y + KAST.plank, { wrijving: 0.7, el: p, data: { naam: 'kast', klank: 'hout', anker: 'kast' + kastMaat.cols + ':' + i, kast: i } });
        });
      }
      // wat ergens op lag, schuift mee met dat ding (en wat in een kast stond die nu anders is, gaat terug naar zijn plek)
      for (const o of oud) {
        if (anders && o[4]) { thuis(o[0]); continue; }
        const nieuw = wereld.vast.find(s => s.el === o[1]); if (!nieuw) continue;
        const dx = nieuw.data.naam === 'vloer' ? 0 : nieuw.aabb[0] - o[2], dy = nieuw.aabb[1] - o[3], b = o[0].b;
        if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) { b.x += dx; b.y += dy; b.px = b.x; b.py = b.y; }
      }
      for (const r of rommels) { if (r.weg) continue; const b = r.b; if (b.x > docB - 12) b.x = docB - 30; if (b.x < 12) b.x = 30; if (b.y > vloerY) b.y = vloerY - 30; wereld.werk(b); }
    }
    function zetWeg(r, weg) {
      r.weg = weg; r.el.hidden = weg;
      const i = wereld.lichamen.indexOf(r.b);
      if (weg && i >= 0) wereld.lichamen.splice(i, 1); else if (!weg && i < 0) wereld.lichamen.push(r.b);
    }

    // ---------- neerleggen: precies op iets, in rust (dan hoeft er bij het openen niets gerekend te worden)
    function opRust(r, x, onder, a) {
      const b = r.b, v = b.vorm; let h = v.soort === 'cirkel' ? v.r : 0;
      if (v.soort === 'poly') { const c = Math.cos(a), s = Math.sin(a); for (let i = 0; i < v.n; i++) h = Math.max(h, s * v.v[2 * i] + c * v.v[2 * i + 1]); }
      b.a = a; b.x = x; b.y = onder - h - 0.3; b.vx = b.vy = b.w = 0; b.px = b.x; b.py = b.y; b.pa = a; wereld.werk(b);
    }
    function ankerVast(naam) { return wereld.vast.find(s => s.data.anker === naam); }
    function legOp(r, anker, f) {
      const s = ankerVast(anker); if (!s) return false;
      const x0 = s.aabb[0], x1 = s.aabb[2], x = x0 + (x1 - x0) * (f == null ? 0.5 : f);
      opRust(r, x, topVan(s, x), r.d.a0 || 0); return true;
    }
    function beginPlek() {
      const bewaard = opslag.p || {};
      for (const r of rommels) {
        if (r.weg) continue;
        const p = bewaard[r.id], s = p && ankerVast(p[0]);
        if (s) {
          const w = s.aabb[2] - s.aabb[0], b = r.b;
          b.x = s.aabb[0] + Math.max(8, Math.min(w - 8, p[1])); b.y = s.aabb[1] + p[2]; b.a = p[3] || 0; b.px = b.x; b.py = b.y; b.pa = b.a; b.vx = b.vy = b.w = 0;
          if (r.soort === 'dobbelsteen' && p[4]) zetVlak(r, p[4]);
          wereld.werk(b); continue;
        }
        thuis(r);
      }
      for (const r of rommels) { if (r.weg) continue; wereld.vrijMaken(r.b); r.b.slaap = steunt(r.b); r.b.rust = 0; }
      teken(1);
    }
    function bewaar() {
      const p = {};
      for (const r of rommels) {
        if (r.weg) continue; const s = draagVlak(r.b); if (!s || !s.data.anker) continue;
        p[r.id] = [s.data.anker, Math.round((r.b.x - s.aabb[0]) * 10) / 10, Math.round((r.b.y - s.aabb[1]) * 10) / 10, Math.round(r.b.a * 1000) / 1000, r.soort === 'dobbelsteen' ? r.face : 0];
      }
      opslag = Object.assign(lees(), { v: 1, p, g: Klank.aan ? 1 : 0 }); schrijf(opslag);
    }

    // ---------- tekenen: alleen transform (en opacity)
    function teken(alfa) {
      for (const r of rommels) {
        if (r.weg) continue;
        const b = r.b, x = b.px + (b.x - b.px) * alfa, y = b.py + (b.y - b.py) * alfa, a = b.pa + (b.a - b.pa) * alfa, m = wereld.midden(b, x, y, a);
        r.lift += (r.liftDoel - r.lift) * 0.3; if (Math.abs(r.lift - r.liftDoel) < 0.01) r.lift = r.liftDoel;
        const sl = r.lift, sc = 1 + 0.1 * sl, gr = (a * 180 / Math.PI).toFixed(2);
        const sy = sc;
        const t = `translate3d(${m[0].toFixed(2)}px,${m[1].toFixed(2)}px,0)`;
        if (t !== r.getoond) { r.el.style.transform = t; r.getoond = t; }
        const td = `rotate(${gr}deg) scale(${sc.toFixed(3)},${sy.toFixed(3)})`;
        if (td !== r.td) { r.draai.style.transform = td; r.td = td; }
        const ts = `translate(${(1 + 2 * sl).toFixed(2)}px,${(3 + 8 * sl).toFixed(2)}px) rotate(${gr}deg) scale(${sc.toFixed(3)},${sy.toFixed(3)})`;
        if (ts !== r.ts) { r.sch.style.transform = ts; r.ts = ts; }
      }
    }

    // ---------- de lus: rekenen alleen als er iets beweegt, hooguit 60 beelden per seconde
    let raf = 0, vorige = 0, rest = 0, laatsteBeeld = 0, telStap = 0, telBeeld = 0, telKlok = 0, bewaarKlok = 0;
    function lus(t) {
      raf = 0;
      if (document.hidden) { vorige = 0; return; }
      if (!vorige) vorige = t;
      if (laatsteBeeld && t - laatsteBeeld < 1000 / 60 - 3) { raf = requestAnimationFrame(lus); return; }
      laatsteBeeld = t;
      rest += Math.min(0.1, (t - vorige) / 1000); vorige = t;
      let n = 0;
      if (!RUSTIG) while (rest >= DT && n < 10) { stap(); rest -= DT; n++; }
      if (n === 10) rest = 0;
      teken(RUSTIG ? 1 : rest / DT);
      telBeeld++; telStap += n;
      geluiden();
      if (debug.aan) debug.teken(t, telStap, telBeeld);
      if (t - telKlok > 500) { debug.tel = [telStap * 1000 / (t - telKlok), telBeeld * 1000 / (t - telKlok)]; telKlok = t; telStap = 0; telBeeld = 0; }
      const lift = rommels.some(r => r.lift !== r.liftDoel), draait = kantel.aan && Math.hypot(kantel.doel[0] - wereld.gx, kantel.doel[1] - wereld.gy) > 2;
      if ((!RUSTIG && !wereld.allesSlaapt()) || lift || tekenaar || pad || draait) raf = requestAnimationFrame(lus);
      else { vorige = 0; rest = 0; laatsteBeeld = 0; teken(1); Klank.rollen(0); clearTimeout(bewaarKlok); bewaarKlok = setTimeout(bewaar, 400); debug.tel = [0, 0]; if (debug.aan) debug.teken(t, 0, 0); }
    }
    function wek() { if (!raf && !document.hidden) { raf = requestAnimationFrame(lus); telKlok = performance.now(); telStap = telBeeld = 0; } }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && !wereld.allesSlaapt()) wek(); });
    function geluiden() {
      let rol = 0;
      for (const r of rommels) if (r.soort === 'knikker' && !r.weg && !r.b.slaap && r.b.raakt) rol = Math.max(rol, r.b.glij * 0.25 + Math.abs(r.b.w) * 17.7 * 0.75);
      Klank.rollen(rol);
      const T = tekenaar || pad; Klank.krassen(T && T.streep && !T.rustig ? T.kras || 0 : 0);
    }

    function stap() {
      kantel.stap(DT);
      wereld.stap(DT);
      for (const r of rommels) {
        if (r.weg) continue; const b = r.b;
        if (r.soort === 'dobbelsteen' && !b.slaap) {
          // elke kwartslag tuimelen: een ander vlak boven (een buurvlak, nooit het vlak aan de overkant)
          r.draaiSom += Math.abs(b.a - b.pa);
          while (r.draaiSom >= Math.PI / 2) { r.draaiSom -= Math.PI / 2; const buren = [1, 2, 3, 4, 5, 6].filter(n => n !== r.face && n !== 7 - r.face); zetVlak(r, buren[Math.floor(Math.random() * 4)]); r.gerold = true; }
        }
        if (r.soort === 'dobbelsteen' && b.slaap && r.gerold) { r.gerold = false; r.draaiSom = 0; uitslagDobbel(r); }
      }
    }
    wereld.opBotsing = (A, B, v, x, y) => {
      const ra = A.data.r, rb = B.vast ? null : B.data.r;
      if (ra) Klank.tik(ra.d.klank, v, ra.id);
      if (rb) Klank.tik(rb.d.klank, v, rb.id);
      if (B.vast && B.data.klank && v > 160) Klank.tik(B.data.klank, v * 0.6, 'v' + B.id);
      if (v > 1150) { if (ra && ra.soort === 'kopje') kopjeBreekt(ra); if (rb && rb.soort === 'kopje') kopjeBreekt(rb); }
      // hard tegen een advertentie: die schudt en wisselt (banners.js houdt bij dat het niet te vaak gebeurt)
      if (B.vast && B.data.naam === 'reclame' && v > 650 && window.RommelBanner && RommelBanner.raak) { try { RommelBanner.raak(B.el); } catch (e) {} }
      if (B.vast && B.data.tik && v > 260 && !RUSTIG) { // de tegel (of het kaartje) voelt een klein tikje
        const doel = B.el.classList && B.el.classList.contains('tg-tegel') ? B.el.querySelector('.tg-vlak') : B.el;
        try { doel.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${Math.min(3, v / 450).toFixed(1)}px)` }, { transform: 'translateY(0)' }], { duration: 170, easing: 'ease-out', composite: 'add' }); } catch (e) {}
      }
      if (v > 900) tril(6);
    };

    // ---------- springen: mik terug op het midden van waar het op ligt (anders valt het zo van een smal plankje)
    function steun(b) {
      wereld.werk(b); const s = draagVlak(b);
      if (!s) return { midden: b.x, breed: 999 };
      return { midden: Math.max(s.aabb[0] + 20, Math.min(s.aabb[2] - 20, b.x)) * 0.35 + (s.aabb[0] + s.aabb[2]) / 2 * 0.65, breed: s.aabb[2] - s.aabb[0] };
    }
    function naarMidden(b, st, sprong) { const tijd = 2 * sprong / wereld.G; return Math.max(-260, Math.min(260, (st.midden - b.x) / tijd)); }

    // ---------- de dobbelsteen
    function zetVlak(r, n) { r.face = n; for (let i = 1; i <= 6; i++) { const g = r.el.querySelector('.vlak' + i); if (g) g.style.opacity = i === n ? '' : '0'; } }
    function uitslagDobbel(r) {
      const n = r.face; r.zessen = n === 6 ? r.zessen + 1 : 0;
      r.el.setAttribute('aria-label', `Dobbelsteen: je gooide een ${GETAL[n]}. Tik om opnieuw te gooien.`);
      if (r.zessen === 3) { // verborgen grapje: drie keer zes op rij
        r.zessen = 0; aankondig('Dobbelsteen: drie keer zes op rij!'); bel(r, 'Drie keer zes!');
        if (!RUSTIG) { for (const q of rommels) if (q !== r && !q.weg && !q.b.kin && !teZwaar(q)) { wereld.wek(q.b); q.b.vy -= 650 + Math.random() * 350; q.b.w += (Math.random() - 0.5) * 14; } wek(); }
        Klank.tik('fonkel', 900); tril(20); return;
      }
      aankondig(`Dobbelsteen: je gooide een ${GETAL[n]}.`); bel(r, GETAL[n] + '!'); tril(8);
    }
    function gooi(r) {
      const b = r.b, inDeLucht = !b.slaap && !b.raakt && r.gerold, st = inDeLucht ? r.steun : steun(b), smal = st.breed < 140; wereld.wek(b);
      r.steun = st;
      // nog in de lucht? dan een klein sprongetje (zo kun je hem jongleren)
      b.vy = inDeLucht ? -(430 + Math.random() * 120) : -(720 + Math.random() * 360); b.vx = naarMidden(b, st, -b.vy) + (Math.random() - 0.5) * (smal ? 40 : 300);
      b.w = (Math.random() < 0.5 ? -1 : 1) * (smal ? 6 + Math.random() * 3 : 15 + Math.random() * 11); r.gerold = true; Klank.tik('gooi', 600); wek();
    }

    // ---------- het potlood (tekenen en krabbelen): langs een pad
    let tekenaar = null, pad = null; // tekenaar: het potlood in je hand; pad: iets dat zelf een route volgt
    const stroken = []; let lijnTeller = 0;
    function nieuweStreep(x, y) {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', `M${x.toFixed(1)} ${y.toFixed(1)}`); lijnen.appendChild(p);
      const s = { p, pts: [[x, y]], d: `M${x.toFixed(1)} ${y.toFixed(1)}`, vast: [], aabb: [x, y, x, y] };
      stroken.push(s); return s;
    }
    function verleng(s, x, y) {
      const l = s.pts[s.pts.length - 1];
      if (Math.hypot(x - l[0], y - l[1]) < 6) return;
      s.pts.push([x, y]); s.d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; s.p.setAttribute('d', s.d);
      s.vast.push(wereld.vastLijn(l[0], l[1], x, y, 2.5, { wrijving: 0.55, stuit: 0.15, data: { lijn: true, klank: 'hout' } })); lijnTeller++;
      s.aabb[0] = Math.min(s.aabb[0], x); s.aabb[1] = Math.min(s.aabb[1], y); s.aabb[2] = Math.max(s.aabb[2], x); s.aabb[3] = Math.max(s.aabb[3], y);
      while (lijnTeller > 400 && stroken.length > 1) haalWeg(stroken[0]);
    }
    function haalWeg(s) {
      const i = stroken.indexOf(s); if (i < 0) return; stroken.splice(i, 1);
      for (const v of s.vast) wereld.weg(v); lijnTeller -= s.vast.length;
      s.p.remove(); clearTimeout(s.klok);
      wereld.wekBij([s.aabb[0] - 30, s.aabb[1] - 60, s.aabb[2] + 30, s.aabb[3] + 30], 4); wek();
    }
    function laatVervagen(s) { if (s.pts.length < 2) { haalWeg(s); return; } requestAnimationFrame(() => s.p.classList.add('vervaag')); s.klok = setTimeout(() => haalWeg(s), 9200); }
    function puntVan(b) { const v = b.vorm, c = Math.cos(b.a), s = Math.sin(b.a), lx = PUNT[0] - v.ox, ly = PUNT[1] - v.oy; return [b.x + c * lx - s * ly, b.y + s * lx + c * ly]; }
    const SCHRIJF = 2.25; // de hoek waarin je een potlood vasthoudt (punt naar linksonder)
    function beginTekenen(r, px, py) {
      if (pad && pad.r === r) stopPad();
      const b = r.b, p = puntVan(b);
      if (RUSTIG) { tekenaar = { r, rustig: true, streep: nieuweStreep(p[0], p[1]), dx: p[0] - px, dy: p[1] - py }; r.el.classList.add('vast'); return; }
      wereld.wek(b); b.kin = true; b.slaap = false;
      tekenaar = { r, px, py, tx: p[0], ty: p[1], streep: nieuweStreep(p[0], p[1]), hoek: b.a, vorigX: p[0] };
      r.liftDoel = 0.6; r.el.classList.add('vast'); wek();
    }
    // het potlood volgt de vinger (of de krabbel) met zijn punt
    function stuurPotlood(T, dt) {
      const b = T.r.b, k = Math.min(1, dt * (T.zelf ? 60 : 26));
      T.tx += (T.px - T.tx) * k; T.ty += (T.py - T.ty) * k;
      const vx = (T.tx - T.vorigX) / dt; T.vorigX = T.tx;
      const doelHoek = SCHRIJF - Math.max(-0.35, Math.min(0.35, vx / 2500));
      let dh = doelHoek - T.hoek; dh = Math.atan2(Math.sin(dh), Math.cos(dh)); T.hoek += dh * Math.min(1, dt * 14);
      const v = b.vorm, c = Math.cos(T.hoek), s = Math.sin(T.hoek), lx = PUNT[0] - v.ox, ly = PUNT[1] - v.oy;
      b.vx = (T.tx - (c * lx - s * ly) - b.x) / dt; b.vy = (T.ty - (s * lx + c * ly) - b.y) / dt;
      let da = T.hoek - b.a; da = Math.atan2(Math.sin(da), Math.cos(da)); b.w = da / dt;
      if (T.streep) verleng(T.streep, T.tx, T.ty);
      T.kras = Math.hypot(b.vx, b.vy);
    }
    function voorStap(dt) {
      if (tekenaar && !tekenaar.rustig) stuurPotlood(tekenaar, dt);
      if (pad) {
        pad.t += dt; const f = Math.min(1, pad.t / pad.duur);
        const q = pad.vorm(f); pad.px = pad.cx + q[0]; pad.py = pad.cy + q[1];
        if (pad.t < 0.18) { pad.px = pad.tx + (pad.px - pad.tx) * (pad.t / 0.18); pad.py = pad.ty + (pad.py - pad.ty) * (pad.t / 0.18); }
        stuurPotlood(pad, dt);
        if (pad.t >= pad.duur + 0.08) stopPad();
      }
    }
    wereld.voorStap = voorStap;
    function loslaten(T, werp) {
      const b = T.r.b; b.kin = false; b.rust = 0;
      const sp = Math.hypot(b.vx, b.vy);
      if (!werp || sp < 160) { b.vx *= 0.2; b.vy *= 0.2; b.w *= 0.2; } else if (sp > 3200) { b.vx *= 3200 / sp; b.vy *= 3200 / sp; }
      b.w = Math.max(-20, Math.min(20, b.w));
      wereld.vrijMaken(b);
      if (T.streep) laatVervagen(T.streep);
      T.r.liftDoel = 0; T.r.el.classList.remove('vast'); wek();
    }
    function stopTekenen(werp) {
      const T = tekenaar; if (!T) return; tekenaar = null;
      if (T.rustig) { laatVervagen(T.streep); T.r.el.classList.remove('vast'); T.r.b.a = 0; T.r.b.pa = 0; wereld.vrijMaken(T.r.b); teken(1); bewaar(); return; }
      loslaten(T, werp);
    }
    function stopPad() { const T = pad; if (!T) return; pad = null; loslaten(T, true); }
    const KRABBELS = [
      ['een hartje', f => { const a = f * Math.PI * 2; return [2.1 * 16 * Math.pow(Math.sin(a), 3), -2.1 * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))]; }, 1.5],
      ['een ster', f => { const k = f * 10, i = Math.floor(k) % 10, j = (i + 1) % 10, t = k - Math.floor(k), pt = n => { const a = -Math.PI / 2 + n * Math.PI / 5, r = n % 2 ? 13 : 32; return [Math.cos(a) * r, Math.sin(a) * r]; }, A = pt(i), B = pt(j); return [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]; }, 1.6],
      ['een spiraal', f => { const a = f * Math.PI * 7, r = 3 + 30 * f; return [Math.cos(a) * r, Math.sin(a) * r]; }, 1.5],
      ['een golfje', f => [-55 + 110 * f, -12 * Math.sin(f * Math.PI * 4)], 1.2],
      ['krulletjes', f => { const a = f * Math.PI * 8; return [-50 + 100 * f + 13 * Math.cos(a + Math.PI), -13 * Math.sin(a)]; }, 1.6]
    ];
    let krabbelNr = Math.floor(Math.random() * KRABBELS.length);
    function krabbel(r) {
      if (tekenaar || pad) return;
      const b = r.b; wereld.wek(b); b.kin = true; b.slaap = false;
      const p = puntVan(b), K2 = KRABBELS[krabbelNr++ % KRABBELS.length];
      const cx = Math.max(70, Math.min(docB - 70, p[0])), cy = Math.max(70, p[1] - 75), s0 = K2[1](0);
      pad = { soort: 'krabbel', r, t: 0, duur: K2[2], vorm: K2[1], cx, cy, px: cx + s0[0], py: cy + s0[1], tx: p[0], ty: p[1], hoek: b.a, vorigX: p[0], zelf: true, streep: nieuweStreep(p[0], p[1]) };
      r.liftDoel = 0.6; aankondig('Potlood: het tekent ' + K2[0] + '.'); Klank.tik('krabbel', 800); wek();
    }

    // ---------- de knikker
    function tikKnikker(r, vanX) {
      const b = r.b; wereld.wek(b);
      const kant = vanX == null ? (Math.random() < 0.5 ? -1 : 1) : vanX < b.x ? 1 : -1;
      b.vx = kant * (380 + Math.random() * 180); b.vy = -110; b.w = b.vx / 17.7;
      Klank.tik('glas', 700, 'knikker-tik'); glans(r); wek();
    }
    function glans(r) { const s = r.el.querySelector('.streep'); if (!s || RUSTIG) return; try { s.animate([{ opacity: 0, transform: 'translateX(0px)' }, { opacity: 0.75, offset: 0.3 }, { opacity: 0, transform: 'translateX(70px)' }], { duration: 650, easing: 'ease-out' }); } catch (e) {} }

    // ---------- de knipoogjes: een kaartje met de naam en de serie, en voor elk een eigen kunstje
    let kaartEl = null, kaartVan = null, kaartKlok = 0;
    function toonKaart(r, ms) {
      if (!r.d.knipoog || r.weg) return;
      if (!kaartEl) { kaartEl = document.createElement('div'); kaartEl.className = 'rm-kaart'; kaartEl.setAttribute('aria-hidden', 'true'); }
      if (kaartEl.parentNode !== laag || laag.lastChild !== kaartEl) laag.appendChild(kaartEl);
      if (kaartVan !== r) kaartEl.innerHTML = `<b>${r.d.naam}</b><span class="rm-serie">${r.d.serie}</span><span class="rm-zin">${r.d.zin}</span>`;
      kaartVan = r;
      const b = r.b, w = kaartEl.offsetWidth, h = kaartEl.offsetHeight, l = Math.max(8, Math.min(docB - w - 8, b.x - w / 2));
      let y = b.aabb[3] + 8; if (y + h > scrollY + innerHeight - 8 || y + h > docH - 8) y = b.aabb[1] - h - 36;
      kaartEl.style.transform = `translate(${Math.round(l)}px,${Math.round(y)}px)`; kaartEl.classList.add('zichtbaar');
      clearTimeout(kaartKlok); if (ms) kaartKlok = setTimeout(() => verbergKaart(), ms);
    }
    function verbergKaart(r) { if (r && kaartVan !== r) return; clearTimeout(kaartKlok); if (kaartEl) kaartEl.classList.remove('zichtbaar'); kaartVan = null; }
    const kq = (r, s) => r.draai.querySelector(s), kqa = (r, s) => [...r.draai.querySelectorAll(s)];
    function speel(el, k, o) { if (!el || !el.animate) return null; try { return el.animate(k, o); } catch (e) { return null; } }
    function weg(el, ms) { setTimeout(() => el.remove(), ms); }
    function wiebel(r, s) { if (RUSTIG) return; speel(r.draai.querySelector('svg'), [0, -6, 5, -3, 1.5, 0].map(g => ({ transform: `rotate(${g * s}deg)` })), { duration: 480, easing: 'ease-out' }); }
    // een korte lichtflits (zonder beweging)
    function flits(x, y, kleur, s) {
      const f = document.createElement('span'); f.className = 'rm-flits'; f.setAttribute('aria-hidden', 'true');
      f.style.width = f.style.height = s + 'px'; f.style.background = `radial-gradient(circle, ${kleur} 0, rgba(255,255,255,0) 68%)`; f.style.transform = `translate(${Math.round(x - s / 2)}px,${Math.round(y - s / 2)}px)`;
      laag.appendChild(f); speel(f, [{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 0 }], { duration: 650, easing: 'ease-out' }); weg(f, 700);
    }
    function bliksem(r) {
      const z = document.createElement('span'); z.className = 'rm-bliksem'; z.setAttribute('aria-hidden', 'true');
      z.innerHTML = '<svg viewBox="0 0 40 80"><path d="M25 1L7 44h13L11 79 36 31H22L32 1z"/></svg>';
      z.style.transform = `translate(${Math.round(r.b.x - 20)}px,${Math.round(r.b.aabb[1] - 84)}px)`; laag.appendChild(z);
      speel(z, RUSTIG ? [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 0.25, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 750 }); weg(z, 800);
      flits(r.b.x, r.b.y, 'rgba(255,236,140,.9)', 150); Klank.tik('donder', 900);
    }
    // iets kleins dat even wegvliegt (een koekje, stof)
    function deeltje(html, x, y, dx, dy, ms, klasse) {
      if (RUSTIG) return;
      const d = document.createElement('span'); d.className = 'rm-deeltje' + (klasse ? ' ' + klasse : ''); d.setAttribute('aria-hidden', 'true'); d.innerHTML = html; laag.appendChild(d);
      speel(d, [{ transform: `translate(${x}px,${y}px) rotate(0deg)`, opacity: 1 }, { transform: `translate(${x + dx * 0.6}px,${y + dy}px) rotate(${dx * 2}deg)`, opacity: 1, offset: 0.5 }, { transform: `translate(${x + dx}px,${y + dy * 0.4}px) rotate(${dx * 4}deg)`, opacity: 0 }], { duration: ms, easing: 'ease-out' });
      weg(d, ms + 50);
    }
    // de hamer: alleen wie het waard is, tilt hem op (na drie keer proberen)
    let hamerWaard = false, hamerPoging = 0;
    const teZwaar = r => r.soort === 'hamer' && !hamerWaard;
    function probeerHamer(r) {
      if (hamerWaard) return true;
      if (++hamerPoging < 3) { wiebel(r, 0.5); Klank.tik('metaal', 700, r.id); bel(r, hamerPoging === 1 ? 'Te zwaar!' : 'Echt te zwaar…'); aankondig('Hamer: hij is te zwaar om op te tillen.'); return false; }
      hamerWaard = true; bliksem(r); bel(r, 'Je bent het waard!'); aankondig('Hamer: je bent het waard! Nu kun je hem optillen.');
      return true;
    }
    function kopjeBreekt(r) {
      if (r.barst) return; r.barst = true; const c = kq(r, '.rm-barst'); if (c) c.setAttribute('opacity', '1');
      Klank.tik('tink', 1100, 'barst'); bel(r, 'Krak!');
      setTimeout(() => { speel(c, [{ opacity: 1 }, { opacity: 0 }], { duration: 800 }); setTimeout(() => { if (c) c.setAttribute('opacity', '0'); r.barst = false; bel(r, 'Weer heel.'); aankondig('Theekopje: het is vanzelf weer heel.'); }, 800); }, 2600);
    }
    // de kubus verdwijnt en duikt ergens anders op (op iets dat in beeld is)
    function teleport(r) {
      const b = r.b, nu = draagVlak(b);
      const keus = wereld.vast.filter(s => s !== nu && s.data.anker && !s.rand && s.data.naam !== 'vloer' && s.aabb[2] - s.aabb[0] >= 70 && s.aabb[1] > scrollY + 100 && s.aabb[1] < scrollY + innerHeight - 30);
      if (!keus.length) { wiebel(r, 1); bel(r, 'Nergens plek.'); return 400; }
      // een vrij plekje: niet bovenop een ander rommeltje
      const w2 = (b.aabb[2] - b.aabb[0]) / 2 + 4, vrij = (s, x) => { const y = topVan(s, x); return !rommels.some(q => q !== r && !q.weg && q.b.aabb[0] < x + w2 && q.b.aabb[2] > x - w2 && q.b.aabb[3] > y - 60 && q.b.aabb[1] < y); };
      let s = null, x = 0;
      for (let i = 0; i < 24 && !s; i++) { const z = keus[Math.floor(Math.random() * keus.length)], xx = z.aabb[0] + 30 + Math.random() * (z.aabb[2] - z.aabb[0] - 60); if (vrij(z, xx)) { s = z; x = xx; } }
      if (!s) { wiebel(r, 1); bel(r, 'Nergens plek.'); return 400; }
      flits(b.x, b.y, 'rgba(130,220,255,.95)', 140); Klank.tik('zap', 900);
      const zet = () => {
        opRust(r, x + b.vorm.ox, topVan(s, x), 0); if (!RUSTIG) { b.y -= 30; b.py = b.y; }
        wereld.vrijMaken(b); wereld.wek(b); teken(1); flits(b.x, b.y, 'rgba(130,220,255,.95)', 140); Klank.tik('zap', 700, 'zap2');
        if (RUSTIG) { b.slaap = steunt(b); bewaar(); } else wek();
        speel(r.el, [{ opacity: 0 }, { opacity: 1 }], { duration: RUSTIG ? 10 : 260 });
      };
      if (RUSTIG) { zet(); aankondig('Blauwe kubus: hij staat nu ergens anders.'); return 300; }
      const an = speel(r.el, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      setTimeout(() => { if (an) an.cancel(); zet(); }, 230);
      aankondig('Blauwe kubus: hij verdwijnt en duikt ergens anders op.'); return 700;
    }
    const KUNST = {
      hamer(r) {
        if (!hamerWaard) { if (!probeerHamer(r)) return 500; } else { bliksem(r); bel(r, 'Donder!'); }
        if (!RUSTIG) { wereld.wek(r.b); r.b.vy = -480; r.b.w = 0; wek(); }
        return 800;
      },
      kubus: teleport,
      stenen(r) {
        kqa(r, '.rm-steen').forEach((g, i) => speel(g, RUSTIG ? [{ opacity: 1 }, { opacity: 0.35 }, { opacity: 1 }] : [{ transform: 'scale(1)' }, { transform: 'scale(1.45)' }, { transform: 'scale(1)' }], { duration: 380, delay: i * 110 }));
        Klank.tik('fonkel', 900);
        setTimeout(() => {
          Klank.tik('knip', 1000); bel(r, 'Knip!');
          const ander = rommels.filter(q => q !== r && !q.weg).sort(() => Math.random() - 0.5), n = Math.floor(ander.length / 2);
          ander.slice(0, n).forEach(q => {
            const v = Math.random() * 350;
            speel(q.el, [{ opacity: 1 }, { opacity: 0, offset: 0.22 }, { opacity: 0, offset: 0.8 }, { opacity: 1 }], { duration: 3600, delay: v });
            for (let i = 0; i < 4; i++) setTimeout(() => deeltje('<i></i>', q.b.x - 3 + (Math.random() - 0.5) * 30, q.b.y - 3 + (Math.random() - 0.5) * 24, 14 + Math.random() * 26, -18 - Math.random() * 26, 900 + Math.random() * 400, 'rm-stof'), v + i * 70);
          });
          aankondig(`Zes steentjes: knip! ${n} rommeltjes zijn even weg.`);
        }, 6 * 110 + 280);
        return 4500;
      },
      klok(r) {
        bliksem(r); bel(r, '10:04!'); aankondig('Klokje: de bliksem slaat in, en hij blijft stilstaan op 10:04.');
        if (!RUSTIG) {
          speel(kq(r, '.rm-uur'), [{ transform: 'rotate(302deg)' }, { transform: 'rotate(1022deg)' }], { duration: 1500, easing: 'cubic-bezier(.3,0,.2,1)' });
          speel(kq(r, '.rm-min'), [{ transform: 'rotate(24deg)' }, { transform: 'rotate(2184deg)' }], { duration: 1500, easing: 'cubic-bezier(.3,0,.2,1)' });
          for (let i = 1; i < 6; i++) setTimeout(() => Klank.tik('klik', 700, 'klok' + i), 200 + i * 200);
        }
        return 1700;
      },
      foto(r) {
        kqa(r, '.rm-kind').forEach((k, i) => speel(k, [{ opacity: 1 }, { opacity: 0, offset: 0.3 }, { opacity: 0, offset: 0.7 }, { opacity: 1 }], { duration: 2400, delay: i * 320 }));
        bel(r, 'Ze vervagen!'); Klank.tik('brom', 600);
        setTimeout(() => { bel(r, 'Nog net op tijd!'); Klank.tik('ding', 600); }, 3100);
        aankondig('Familiefoto: de kinderen vervagen, en komen nog net op tijd terug.'); return 3300;
      },
      meter(r) {
        const nd = kq(r, '.rm-naald');
        if (RUSTIG) { bel(r, '88!'); aankondig('Snelheidsmeter: 88! Er gebeurt iets.'); return 600; }
        const an = speel(nd, [{ transform: 'rotate(-110deg)' }, { transform: 'rotate(96deg)' }], { duration: 1000, easing: 'ease-in', fill: 'forwards' });
        Klank.tik('zoef', 900);
        setTimeout(() => {
          const b = r.b, links = b.x > docB / 2;
          flits(b.x, b.y, 'rgba(255,255,255,.95)', 170); Klank.tik('knal', 1000); bel(r, '88!');
          for (const dy of [-5, 4]) {
            const v = document.createElement('span'); v.className = 'rm-vuur' + (links ? ' links' : ''); v.setAttribute('aria-hidden', 'true');
            v.style.left = Math.round(links ? b.x - 150 : b.x) + 'px'; v.style.top = Math.round(b.aabb[3] - 9 + dy) + 'px'; laag.appendChild(v);
            speel(v, [{ transform: 'scaleX(0)', opacity: 1 }, { transform: 'scaleX(1)', opacity: 1, offset: 0.3 }, { transform: 'scaleX(1)', opacity: 0 }], { duration: 1300, easing: 'ease-out' }); weg(v, 1350);
          }
          speel(r.el, [{ opacity: 1 }, { opacity: 0, offset: 0.06 }, { opacity: 0, offset: 0.85 }, { opacity: 1 }], { duration: 1700 });
          setTimeout(() => { if (an) an.cancel(); flits(r.b.x, r.b.y, 'rgba(255,255,255,.9)', 130); Klank.tik('plof', 700, 'meter-terug'); aankondig('Snelheidsmeter: 88! Hij was even weg, en is terug.'); }, 1450);
        }, 1000);
        return 2800;
      },
      computer(r) {
        const t = kqa(r, '.rm-cijfers text'), oud = t.map(e => e.textContent);
        aankondig('Oude computer: de enge cijfers zijn verfijnd.');
        if (RUSTIG) { bel(r, 'Verfijnd: 100%'); return 600; }
        let n = 0;
        const iv = setInterval(() => {
          t.forEach(e => { e.textContent = e.textContent.replace(/\d/g, () => String(Math.floor(Math.random() * 10))); });
          if (n % 2 === 0) Klank.tik('klik', 600, 'pc' + (n % 4));
          if (++n >= 14) { clearInterval(iv); t.forEach((e, i) => { e.textContent = oud[i]; }); bel(r, 'Verfijnd: 100%'); Klank.tik('ding', 600); }
        }, 75);
        return 1300;
      },
      wafel(r) {
        const i = r.hap || 0, c = kq(r, '.rm-hap' + i); if (c) c.setAttribute('r', '6.5'); r.hap = i + 1; Klank.tik('hap', 800);
        if (r.hap < 3) { bel(r, i ? 'Nog een hap!' : 'Hap!'); aankondig('Wafel: hap!'); return 250; }
        bel(r, 'Wafelfeest!'); aankondig('Wafel: op! Wafelfeest.');
        setTimeout(() => { kqa(r, '.rm-hap').forEach(h => h.setAttribute('r', '0')); r.hap = 0; Klank.tik('ding', 600); bel(r, 'Nog een wafel!'); }, 1900);
        return 2100;
      },
      vingerval(r) {
        if (!RUSTIG) speel(kq(r, '.tek'), [{ transform: 'scale(1,1)' }, { transform: 'scale(1.3,.84)', offset: 0.4 }, { transform: 'scale(.95,1.05)', offset: 0.7 }, { transform: 'scale(1,1)' }], { duration: 700, easing: 'ease-out' });
        Klank.tik('boing', 700, 1.3); bel(r, 'Hoera.'); aankondig('Vingerval: hoera.'); return 750;
      },
      bordje(r) {
        const p = kq(r, '.rm-plakker'); if (p) p.setAttribute('opacity', '0');
        Klank.tik('scheur', 900); bel(r, 'Oeps!');
        if (!RUSTIG) {
          const k = g => [{ transform: 'none' }, { transform: `translate(${-2.5 * g}px,1px) rotate(${-10 * g}deg)`, offset: 0.3 }, { transform: `translate(${-2.5 * g}px,1px) rotate(${-10 * g}deg)`, offset: 0.65 }, { transform: 'none' }];
          speel(kq(r, '.rm-links'), k(1), { duration: 1300, easing: 'ease-in-out' }); speel(kq(r, '.rm-rechts'), k(-1), { duration: 1300, easing: 'ease-in-out' });
        }
        setTimeout(() => { if (p) p.setAttribute('opacity', '1'); Klank.tik('plak', 700); bel(r, 'GELOOF!'); aankondig('Bordje: gescheurd en weer vastgeplakt. Geloof!'); }, RUSTIG ? 300 : 1150);
        return 1500;
      },
      koekjes(r) {
        if (!RUSTIG) speel(kq(r, '.rm-deksel'), [{ transform: 'rotate(0deg)' }, { transform: 'translateY(-3px) rotate(-12deg)', offset: 0.3 }, { transform: 'rotate(0deg)' }], { duration: 750, easing: 'ease-out' });
        deeltje('<svg viewBox="0 0 14 14"><rect x="3" y="1" width="8" height="12" rx="2" fill="#E9C27A" stroke="#231A26" stroke-width="1.6"/></svg>', r.b.x - 7, r.b.aabb[1] + 4, r.b.x > docB / 2 ? -46 : 46, -46, 900);
        Klank.tik('hout', 600, r.id); bel(r, 'Voor de baas!'); aankondig('Koekjes: elke ochtend vers, voor de baas.'); return 900;
      },
      donutdoos(r) {
        if (!RUSTIG) speel(kq(r, '.rm-wip'), [{ transform: 'translateY(0) rotate(0deg)' }, { transform: 'translateY(-9px) rotate(-10deg)', offset: 0.4 }, { transform: 'translateY(0) rotate(0deg)' }], { duration: 650, easing: 'ease-out' });
        const tot = (12 - new Date().getDay()) % 7, t = tot === 0 ? 'Het is vrijdag!' : tot === 1 ? 'Morgen is het vrijdag' : `Nog ${tot} dagen tot vrijdag`;
        Klank.tik('plastic', 600, r.id); bel(r, t); aankondig('Doos donuts: ' + t.toLowerCase() + '.'); return 700;
      },
      glaasjes(r) {
        if (!RUSTIG) speel(kq(r, '.rm-wip'), [{ transform: 'translateY(0)' }, { transform: 'translateY(-7px)', offset: 0.35 }, { transform: 'translateY(-7px)', offset: 0.6 }, { transform: 'translateY(0)' }], { duration: 800, easing: 'ease-in-out' });
        Klank.tik('glas', 500, r.id); bel(r, 'Gewoon een hobby.'); aankondig('Kistje met glaasjes: gewoon een hobby. Echt.'); return 850;
      },
      kopje(r) {
        if (!RUSTIG) speel(kq(r, '.rm-damp'), [{ transform: 'translateY(0)', opacity: 0.8 }, { transform: 'translateY(-6px)', opacity: 0 }, { transform: 'translateY(3px)', opacity: 0, offset: 0.55 }, { transform: 'translateY(0)', opacity: 0.8 }], { duration: 1600 });
        Klank.tik('tink', 700, r.id); bel(r, 'Thee?'); aankondig('Theekopje: thee?'); return 900;
      },
      hert(r) {
        speel(kq(r, '.rm-oog'), [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }], { duration: 1900 });
        Klank.tik('brom', 800); bel(r, 'Altijd.'); aankondig('Zwart hertje: het kijkt je aan. Altijd.'); return 1900;
      }
    };
    function knipoogActie(r) {
      toonKaart(r, 2800);
      if (r.bezig || (r.b.kin && !RUSTIG)) return;
      const f = KUNST[r.soort]; if (!f) return;
      const ms = f(r) || 600; r.bezig = true; setTimeout(() => { r.bezig = false; }, ms);
    }

    // ---------- uitkomsten voor iedereen (ook voor schermlezers)
    let meldEl = null;
    function aankondig(t) { if (!meldEl) return; meldEl.textContent = ''; setTimeout(() => { meldEl.textContent = t; }, 30); }
    function bel(r, tekst) {
      const d = document.createElement('div'); d.className = 'rm-bel'; d.textContent = tekst; d.setAttribute('aria-hidden', 'true'); laag.appendChild(d);
      const w = d.offsetWidth, l = Math.max(8, Math.min(docB - w - 8, r.b.x - w / 2)), y = Math.min(r.b.y - 44, r.b.aabb[1] - 30);
      const k = [{ transform: `translate(${l}px,${y}px) scale(.6)`, opacity: 0 }, { transform: `translate(${l}px,${y - 14}px) scale(1)`, opacity: 1, offset: .2 }, { transform: `translate(${l}px,${y - 18}px) scale(1)`, opacity: 1, offset: .8 }, { transform: `translate(${l}px,${y - 26}px) scale(1)`, opacity: 0 }];
      d.style.transform = k[1].transform;
      try { const an = d.animate(RUSTIG ? [{ opacity: 0 }, { opacity: 1, offset: .15 }, { opacity: 1, offset: .85 }, { opacity: 0 }] : k, { duration: 1500, easing: 'ease-out' }); an.onfinish = () => d.remove(); } catch (e) { setTimeout(() => d.remove(), 1500); }
    }
    function hupje(r) { r.el.classList.remove('hup'); void r.el.offsetWidth; r.el.classList.add('hup'); }

    // ---------- aanraken: oppakken, gooien, tikken
    let greep = null;
    function koppel(r) {
      const el = r.el;
      el.addEventListener('pointerdown', e => {
        if (greep || (e.pointerType === 'mouse' && e.button !== 0)) return;
        e.preventDefault(); Klank.start(); bouwWereld(); clearTimeout(r.kaartKlok);
        try { (e.target.setPointerCapture ? e.target : el).setPointerCapture(e.pointerId); } catch (x) {}
        greep = { r, id: e.pointerId, x0: e.pageX, y0: e.pageY, t0: performance.now(), cx: e.clientX, cy: e.clientY, sleept: false, veer: null };
      });
      el.addEventListener('pointermove', e => {
        if (!greep || greep.id !== e.pointerId) return;
        greep.cx = e.clientX; greep.cy = e.clientY;
        const x = e.pageX, y = e.pageY;
        if (!greep.sleept && Math.hypot(x - greep.x0, y - greep.y0) > 6) startSlepen(x, y);
        if (greep.sleept) volg(x, y);
      });
      const los = e => {
        if (!greep || greep.id !== e.pointerId) return;
        const g = greep; greep = null;
        if (!g.sleept) { if (e.type === 'pointerup' && performance.now() - g.t0 < 400) actie(g.r, e.pageX); return; }
        if (g.r.soort === 'potlood') stopTekenen(true);
        else if (g.veer) {
          wereld.laatLos(g.veer); const b = g.r.b, sp = Math.hypot(b.vx, b.vy); if (sp > 3600) { b.vx *= 3600 / sp; b.vy *= 3600 / sp; }
          wereld.vrijMaken(b); g.r.liftDoel = 0; g.r.el.classList.remove('vast'); if (sp > 700) Klank.tik('gooi', sp * 0.5);
          if (g.r.soort === 'dobbelsteen') g.r.gerold = true;
          wek();
        } else if (RUSTIG) { g.r.liftDoel = 0; g.r.el.classList.remove('vast'); teken(1); bewaar(); }
      };
      el.addEventListener('pointerup', los); el.addEventListener('pointercancel', los); el.addEventListener('lostpointercapture', los);
      el.addEventListener('click', e => e.preventDefault());
      el.addEventListener('pointerover', e => { // een klein hupje als de muis erover gaat
        if (e.pointerType !== 'mouse' || greep || RUSTIG || teZwaar(r)) return;
        const nu = performance.now(); if (r.hupKlok && nu - r.hupKlok < 700) return; r.hupKlok = nu;
        const b = r.b; if (!b.slaap || b.kin) return; wereld.wek(b); b.vy = -150; b.w = (Math.random() - 0.5) * 2; wek();
      });
      // het kaartje met de naam: als de muis erop blijft staan, of met het toetsenbord
      if (r.d.knipoog) {
        el.addEventListener('pointerenter', e => { if (e.pointerType !== 'mouse') return; clearTimeout(r.kaartKlok); r.kaartKlok = setTimeout(() => { if (!greep) toonKaart(r); }, 280); });
        el.addEventListener('pointerleave', e => { if (e.pointerType !== 'mouse') return; clearTimeout(r.kaartKlok); verbergKaart(r); });
        el.addEventListener('focus', () => { let z = true; try { z = el.matches(':focus-visible'); } catch (x) {} if (z) toonKaart(r); });
        el.addEventListener('blur', () => verbergKaart(r));
      }
      el.addEventListener('keydown', e => {
        const b = r.b;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); Klank.start(); bouwWereld(); actie(r, null); return; }
        const duw = { ArrowLeft: [-380, -260], ArrowRight: [380, -260], ArrowUp: [0, -900], ArrowDown: [0, 320] }[e.key];
        if (!duw) return; e.preventDefault(); Klank.start();
        if (teZwaar(r)) { wiebel(r, 0.5); bel(r, 'Te zwaar!'); return; }
        if (RUSTIG) { b.x += Math.sign(duw[0]) * 16; b.y += duw[1] > 0 ? 16 : duw[0] ? 0 : -16; b.px = b.x; b.py = b.y; wereld.vrijMaken(b); teken(1); bewaar(); return; }
        if (b.kin) return; bouwWereld(); wereld.wek(b); b.vx += duw[0]; b.vy += duw[1]; if (duw[0]) b.w += duw[0] / 60; wek();
      });
    }
    function startSlepen(x, y) {
      const g = greep, r = g.r; g.sleept = true; tril(4); verbergKaart();
      if (teZwaar(r) && !probeerHamer(r)) { g.vast = true; return; }
      if (pad && pad.r === r) stopPad();
      if (r.soort === 'potlood') { beginTekenen(r, x, y); return; }
      if (RUSTIG) { g.dx = r.b.x - x; g.dy = r.b.y - y; r.liftDoel = 0.6; r.el.classList.add('vast'); return; }
      g.veer = wereld.pak(r.b, x, y, { hz: 6, zeta: 0.6 }); r.liftDoel = 1; r.el.classList.add('vast'); wek();
    }
    function volg(x, y) {
      const g = greep, r = g.r; if (g.vast) return;
      if (r.soort === 'potlood' && tekenaar && tekenaar.rustig) {
        const T = tekenaar, b = r.b, tx = x + T.dx * 0.3, ty = y + T.dy * 0.3, v = b.vorm, c = Math.cos(SCHRIJF), s = Math.sin(SCHRIJF), lx = PUNT[0] - v.ox, ly = PUNT[1] - v.oy;
        b.a = SCHRIJF; b.x = tx - (c * lx - s * ly); b.y = ty - (s * lx + c * ly); b.px = b.x; b.py = b.y; b.pa = b.a; wereld.werk(b);
        verleng(T.streep, tx, ty); teken(1); return;
      }
      if (r.soort === 'potlood' && tekenaar) { tekenaar.px = x; tekenaar.py = y; return; }
      if (g.veer) { g.veer.tx = Math.max(4, Math.min(docB - 4, x)); g.veer.ty = Math.max(4, Math.min(vloerY - 4, y)); wek(); return; }
      if (RUSTIG) { const b = r.b; b.x = Math.max(20, Math.min(docB - 20, x + g.dx)); b.y = Math.max(20, Math.min(vloerY - 20, y + g.dy)); b.px = b.x; b.py = b.y; wereld.werk(b); teken(1); }
    }
    addEventListener('scroll', () => { if (greep && greep.sleept) volg(greep.cx + scrollX, greep.cy + scrollY); }, { passive: true });
    function actie(r, vanX) {
      if (r.d.knipoog) { knipoogActie(r); return; }
      if (RUSTIG) { // minder beweging: een rustig hupje en de uitkomst, verder niets
        hupje(r);
        if (r.soort === 'dobbelsteen') { zetVlak(r, 1 + Math.floor(Math.random() * 6)); uitslagDobbel(r); bewaar(); }
        else { Klank.tik(r.d.klank, 600, r.id); aankondig(r.d.naam + ': hupje!'); }
        return;
      }
      if (r.b.kin) return;
      if (r.soort === 'dobbelsteen') gooi(r);
      else if (r.soort === 'knikker') tikKnikker(r, vanX);
      else if (r.soort === 'potlood') krabbel(r);
    }

    // ---------- kantelen en schudden (telefoon en tablet)
    const kantel = {
      aan: false, kreegIets: false, doel: [0, 2600], wekG: [0, 2600], meterKlok: 0, knop: null,
      stap(dt) { if (!this.aan) return; const k = 1 - Math.exp(-dt / 0.07); wereld.gx += (this.doel[0] - wereld.gx) * k; wereld.gy += (this.doel[1] - wereld.gy) * k; },
      orientatie(e) {
        if (e.beta == null || e.gamma == null) return; kantel.kreegIets = true;
        const be = e.beta * Math.PI / 180, ga = e.gamma * Math.PI / 180, gx = Math.cos(be) * Math.sin(ga), gy = Math.sin(be);
        const th = ((screen.orientation && screen.orientation.angle) || window.orientation || 0) * Math.PI / 180;
        const x2 = gx * Math.cos(th) + gy * Math.sin(th), y2 = -gx * Math.sin(th) + gy * Math.cos(th);
        kantel.doel = [x2 * wereld.G, Math.max(-0.3, y2) * wereld.G];
        // wie slaapt, wordt pas wakker als de zwaartekracht echt anders staat (niet bij elk trillen van je hand)
        if (Math.hypot(kantel.doel[0] - kantel.wekG[0], kantel.doel[1] - kantel.wekG[1]) > wereld.G * 0.025) { kantel.wekG = kantel.doel.slice(); bouwWereld(); wereld.wekAlles(); wek(); }
      },
      schudKlok: 0,
      beweging(e) {
        const a = e.acceleration; if (!a || a.x == null) return; kantel.kreegIets = true;
        const m = Math.hypot(a.x, a.y, a.z || 0), nu = performance.now();
        if (m < 15 || nu - kantel.schudKlok < 250) return; kantel.schudKlok = nu;
        for (const r of rommels) { const b = r.b; if (b.kin || r.weg || teZwaar(r)) continue; wereld.wek(b); b.vx += (Math.random() - 0.5) * 1600 - a.x * 60; b.vy += -400 - Math.random() * 900; b.w += (Math.random() - 0.5) * 30; }
        tril(10); wek();
      },
      uit() {
        this.aan = false; removeEventListener('deviceorientation', this.orientatie); removeEventListener('devicemotion', this.beweging);
        wereld.gx = 0; wereld.gy = wereld.G; this.doel = [0, wereld.G]; bouwWereld(); wereld.wekAlles(); wek();
        if (this.knop) this.knop.setAttribute('aria-pressed', 'false');
      },
      async wissel() {
        if (this.aan) { this.uit(); aankondig('Kantelen staat uit.'); return; }
        Klank.start();
        try {
          if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iPhone en iPad: toestemming vragen, meteen bij de tik (allebei tegelijk, anders is de tik al 'op')
            const vragen = [DeviceOrientationEvent.requestPermission()];
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') vragen.push(DeviceMotionEvent.requestPermission().catch(() => 'denied'));
            const ant = await Promise.all(vragen);
            if (ant[0] !== 'granted') { aankondig('Geen toestemming: de rommeltjes werken gewoon zonder kantelen.'); toast('Geen toestemming: ze werken gewoon zonder kantelen.'); return; }
          }
        } catch (e) { toast('Kantelen kan hier niet.'); return; }
        this.aan = true; this.kreegIets = false; this.wekG = [wereld.gx, wereld.gy]; this.doel = [wereld.gx, wereld.gy];
        if (this.knop) this.knop.setAttribute('aria-pressed', 'true');
        addEventListener('deviceorientation', this.orientatie); addEventListener('devicemotion', this.beweging);
        toast('Kantel je telefoon, of schud eens!'); aankondig('Kantelen staat aan.');
        setTimeout(() => { if (kantel.aan && !kantel.kreegIets) { toast('Dit apparaat geeft geen kanteling door.'); kantel.uit(); } }, 1600);
      }
    };
    let toastEl = null, toastKlok = 0;
    function toast(t) { if (!toastEl) return; toastEl.textContent = t; toastEl.classList.add('zichtbaar'); clearTimeout(toastKlok); toastKlok = setTimeout(() => toastEl.classList.remove('zichtbaar'), 2600); }

    // ---------- verborgen: typ "natuurkunde" en zie wat de motor ziet
    const debug = {
      aan: false, doek: null, ctx: null, label: null, tel: [0, 0],
      wissel() {
        this.aan = !this.aan;
        if (!this.doek) { this.doek = document.createElement('canvas'); this.doek.className = 'rm-debug'; this.doek.setAttribute('aria-hidden', 'true'); this.ctx = this.doek.getContext('2d'); this.label = document.createElement('div'); this.label.className = 'rm-debuglabel'; this.label.setAttribute('aria-hidden', 'true'); document.body.appendChild(this.doek); document.body.appendChild(this.label); }
        this.doek.hidden = this.label.hidden = !this.aan; this.teken(performance.now(), 0, 0);
      },
      teken() {
        if (!this.aan) return;
        const dpr = Math.min(2, devicePixelRatio || 1), w = innerWidth, h = innerHeight, c = this.ctx;
        if (this.doek.width !== Math.round(w * dpr) || this.doek.height !== Math.round(h * dpr)) { this.doek.width = Math.round(w * dpr); this.doek.height = Math.round(h * dpr); }
        c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
        wereld.tekenDebug(c, scrollX, scrollY, { vast: 'rgba(47,111,181,.85)', wakker: '#C8323C', slaap: '#2E8B62', snel: '#C8323C', contact: '#E89B1C' });
        const wakker = wereld.lichamen.filter(b => !b.slaap).length;
        this.label.textContent = raf ? `rekent · ${Math.round(this.tel[0])} stappen/s · ${Math.round(this.tel[1])} beelden/s · ${wakker} wakker` : 'in rust · rekent niets';
      }
    };
    let getypt = '';
    document.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1 || /input|textarea|select/i.test((e.target && e.target.tagName) || '')) return;
      getypt = (getypt + e.key.toLowerCase()).slice(-11);
      if (getypt === 'natuurkunde') { getypt = ''; debug.wissel(); }
    });
    addEventListener('scroll', () => { if (debug.aan && !raf) debug.teken(); }, { passive: true });

    // ---------- de knopjes (geluid en kantelen): onder het plankje naast het briefje, of op een telefoon in de balk boven de tegels
    let knopGroep = null, knopPlek = null;
    function plaatsKnopjes(naastBrief) {
      if (!knopGroep) return;
      if (naastBrief) {
        const rij = $('.held-rij'); if (!rij) return;
        if (!knopPlek) { knopPlek = document.createElement('div'); knopPlek.className = 'tg-rommelplek'; }
        if (knopPlek.parentNode !== rij) rij.appendChild(knopPlek);
        if (knopGroep.parentNode !== knopPlek) knopPlek.appendChild(knopGroep);
      } else {
        const balk = $('.tg-balk'); if (!balk) return;
        if (knopGroep.parentNode !== balk) { const wg = balk.querySelector('.tg-weergave'); if (wg) balk.insertBefore(knopGroep, wg); else balk.appendChild(knopGroep); }
        if (knopPlek && knopPlek.parentNode) knopPlek.remove();
      }
    }
    function knopjes() {
      const balk = $('.tg-balk'); if (!balk || balk.querySelector('.tg-rommelknop')) return;
      const w = document.createElement('div'); w.className = 'tg-rommelknop'; w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'De rommeltjes');
      const kan = typeof DeviceOrientationEvent !== 'undefined' && window.matchMedia && matchMedia('(any-pointer: coarse)').matches && !RUSTIG;
      w.innerHTML = `<button type="button" class="tg-rk-geluid" aria-pressed="${Klank.aan}" aria-label="Geluid van de rommeltjes"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path class="rk-golf" d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.5a8 8 0 0 1 0 11"/><path class="rk-stil" d="M16 9.5l5 5M21 9.5l-5 5"/></svg></button>` +
        `<button type="button" class="tg-rk-terug" aria-label="Zet de rommeltjes terug op hun plek"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4 4.5v4h4"/></svg></button>` +
        (kan ? `<button type="button" class="tg-rk-kantel" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="3.5" width="9" height="16" rx="2" transform="rotate(18 12.5 11.5)"/><path d="M3.5 15.5a8 8 0 0 0 4 4.5M20.5 8.5a8 8 0 0 0-4-4.5"/></svg><span>Kantel</span></button>` : '');
      knopGroep = w;
      const gk = w.querySelector('.tg-rk-geluid');
      gk.addEventListener('click', () => { const aan = !Klank.aan; Klank.zetAan(aan); gk.setAttribute('aria-pressed', String(aan)); bewaar(); toast(aan ? 'Geluid van de rommeltjes staat aan.' : 'Geluid van de rommeltjes staat uit.'); });
      w.querySelector('.tg-rk-terug').addEventListener('click', legTerug);
      const kk = w.querySelector('.tg-rk-kantel'); if (kk) { kantel.knop = kk; kk.addEventListener('click', () => kantel.wissel()); }
    }

    // ---------- alles terug op zijn plek
    function legTerug() {
      if (greep) return;
      if (tekenaar) stopTekenen(false); if (pad) stopPad();
      for (const s of stroken.slice()) haalWeg(s);
      bouwWereld();
      for (const r of rommels) {
        if (r.weg) continue; const b = r.b;
        b.kin = false; b.st = b.data.st0; r.liftDoel = 0;
        thuis(r);
      }
      for (const r of rommels) { if (r.weg) continue; wereld.vrijMaken(r.b); r.b.slaap = steunt(r.b); r.b.rust = 0; if (!r.b.slaap) wek(); }
      teken(1); opslag = Object.assign(lees(), { p: {} }); schrijf(opslag);
      Klank.start(); Klank.tik('hout', 500, 'terug'); aankondig('De rommeltjes liggen weer op hun plek.'); toast('Alles staat weer op zijn plek.');
    }

    // ---------- starten
    function start() {
      if (laag) return;
      laag = document.createElement('div'); laag.id = 'rm-laag';
      lijnen = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); lijnen.id = 'rm-lijnen'; lijnen.setAttribute('aria-hidden', 'true');
      meldEl = document.createElement('div'); meldEl.className = 'rm-weg'; meldEl.setAttribute('aria-live', 'polite');
      toastEl = document.createElement('div'); toastEl.className = 'rm-toast'; toastEl.setAttribute('role', 'status');
      document.body.appendChild(lijnen); document.body.appendChild(laag); document.body.appendChild(meldEl); document.body.appendChild(toastEl);
      const telS = {};
      BRIEF.forEach(s => { telS[s] = (telS[s] || 0); maak(s, 'brief', telS[s]++); });
      KAST_ALLES.forEach(s => maak(s, 'kast', 0));
      // de rommelkast: een lege plek in de pagina (tussen de advertentie en Alle spellen), of in de kantlijn
      kastSec = document.createElement('section'); kastSec.className = 'tg-kast'; kastSec.setAttribute('aria-hidden', 'true'); kastSec.hidden = true;
      const spellen = $('#spellen'); if (spellen) spellen.before(kastSec); else document.body.appendChild(kastSec);
      kastEl = document.createElement('div'); kastEl.className = 'rm-kast'; kastEl.setAttribute('aria-hidden', 'true');
      knopjes();
      bouwWereld();
      beginPlek();
      for (const r of rommels) if (!r.weg && !r.b.slaap) { wek(); break; }
      let herKlok = 0;
      const herbouw = () => { clearTimeout(herKlok); herKlok = setTimeout(() => { bouwWereld(); naVerspringen(); }, 150); };
      addEventListener('resize', herbouw);
      addEventListener('load', herbouw);
      setTimeout(herbouw, 900);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(herbouw);
      if ('ResizeObserver' in window) { let eerste = true; new ResizeObserver(() => { if (eerste) { eerste = false; return; } herbouw(); }).observe(document.body); }
      document.addEventListener('click', e => { if (e.target.closest && e.target.closest('.tg-filters button')) setTimeout(herbouw, 30); });
    }
    function naVerspringen() { for (const r of rommels) { if (r.weg) continue; wereld.vrijMaken(r.b); if (!r.b.kin && !steunt(r.b)) { wereld.wek(r.b); wek(); } } teken(1); }
    return { start, wereld, rommels, get raf() { return raf; }, bouwWereld, stap, teken, wek, legTerug, actie: (id, x) => actie(rommels.find(r => r.id === id), x), debug, botsing: Fysica.botsing };
  })();
  function zetRommeltjes() { try { RM.start(); window.__rommeltjes = RM; } catch (e) { if (window.reportError) reportError(e); } }

  // ================= starten, en daarna de homepage zacht laten verschijnen
  const klaar = () => requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('hp-klaar')));
  const begin = () => { try { bouw(); } finally { klaar(); } };
  if ($('.v8')) begin();
  else { const w = new MutationObserver(() => { if ($('.v8')) { w.disconnect(); begin(); } }); w.observe(document.documentElement, { childList: true, subtree: true }); setTimeout(() => { w.disconnect(); klaar(); }, 2500); }
})();
