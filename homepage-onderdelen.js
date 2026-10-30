/* homepage-onderdelen.js voor Ruben's rommelhoekje: gereedschap, animaties, iconen, scorebord, sticker, coulissen en de stijl van de kaarten. Upload een nieuwe versie van dit bestand om de homepage bij te werken. */
;(function () {
var s = document.createElement('style'); s.id = 'onderdelen-stijl'; s.textContent = "\n.rek { position: relative; }\n.rek.zijkant { position: absolute; top: 7rem; height: 50rem; width: calc((100% - var(--inhoud)) / 2 - 2rem); display: none; z-index: 0; }\n.rek.zijkant.links { left: 1rem; }\n.rek.zijkant.rechts { right: 1rem; }\n.muurlaag { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; z-index: 3; }\n.gs { position: absolute; pointer-events: none; user-select: none; -webkit-user-select: none; filter: drop-shadow(3px 5px 0 rgba(0,0,0,.25)); z-index: 1; }\n.gs svg { display: block; pointer-events: none; overflow: visible; }\n.gs svg * { pointer-events: visiblePainted; cursor: grab; }\n.gs.sleept { z-index: 30; filter: drop-shadow(9px 16px 0 rgba(0,0,0,.22)); }\n.gs.sleept svg * { cursor: grabbing; }\n.gs-haak { position: absolute; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #A8B3CC; box-shadow: 0 2px 0 rgba(0,0,0,.45); pointer-events: none; z-index: 2; transition: opacity .2s; }\n@media (pointer: coarse) { .gs svg * { cursor: pointer; } }\n.gs-sleept, .gs-sleept * { -webkit-user-select: none !important; user-select: none !important; cursor: grabbing !important; }\n\n.dag b { display: inline-block; }\n.label-icoon svg { transform-origin: 50% 80%; }\n"; document.head.appendChild(s);
})();
;(function () {

const SPELICONEN = {"groepjes": "<g stroke=\"#231A26\" stroke-width=\"2.2\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"6\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#FFB357\" transform=\"rotate(-7 17.5 17.5)\"/><rect x=\"34\" y=\"5\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#5FCDB8\" transform=\"rotate(6 46.5 16.5)\"/><rect x=\"5\" y=\"35\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#D54373\" transform=\"rotate(5 17.5 46.5)\"/><rect x=\"34\" y=\"35\" width=\"25\" height=\"23\" rx=\"5\" fill=\"#333F98\" transform=\"rotate(-5 46.5 46.5)\"/></g><circle cx=\"17.5\" cy=\"18\" r=\"4.2\" fill=\"#231A26\"/><path d=\"M46.5 11.5l5.6 9.6h-11.2z\" fill=\"#231A26\"/><rect x=\"13.5\" y=\"42.5\" width=\"8\" height=\"8\" rx=\"1\" fill=\"#fff\"/><path d=\"M46.50 40.80 L48.03 44.90 L52.40 45.08 L48.97 47.80 L50.14 52.02 L46.50 49.60 L42.86 52.02 L44.03 47.80 L40.60 45.08 L44.97 44.90Z\" fill=\"#FFD45C\"/>", "kaarten": "<g transform=\"rotate(-14 26 36)\"><rect x=\"10\" y=\"12\" width=\"28\" height=\"40\" rx=\"4\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"14\" y=\"16\" width=\"20\" height=\"32\" rx=\"2\" fill=\"none\" stroke=\"#F2DDA0\" stroke-width=\"1.6\"/><path d=\"M24 25l5 7-5 7-5-7z\" fill=\"#F2DDA0\"/></g><g transform=\"rotate(11 40 34)\"><rect x=\"25\" y=\"12\" width=\"28\" height=\"40\" rx=\"4\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M39 41c-6.5-4.2-9.5-7.6-9.5-10.8a4.8 4.8 0 0 1 9.5-1.2 4.8 4.8 0 0 1 9.5 1.2c0 3.2-3 6.6-9.5 10.8z\" fill=\"#C8323C\"/><path d=\"M29 15.5v6M29 15.5l3 6M29 18.5h2.4\" stroke=\"#C8323C\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/></g>", "woord": "<g transform=\"rotate(-8 18 34)\"><rect x=\"5\" y=\"20\" width=\"24\" height=\"24\" rx=\"4\" fill=\"#5F6470\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M12 27h10M17 27v11\" stroke=\"#E6E3DA\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"rotate(6 46 30)\"><rect x=\"35\" y=\"16\" width=\"24\" height=\"24\" rx=\"4\" fill=\"#F2DDA0\" stroke=\"#C8323C\" stroke-width=\"2.4\" stroke-dasharray=\"4 2.4\"/><path d=\"M41 34l6-12 6 12M43.2 29.6h7.6\" stroke=\"#9E2430\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><rect x=\"20\" y=\"30\" width=\"26\" height=\"26\" rx=\"4\" fill=\"#2E8B62\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"41\" cy=\"35\" r=\"2\" fill=\"#fff\"/><path d=\"M25 37l3 12 5-8 5 8 3-12\" stroke=\"#fff\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>", "doos": "<path d=\"M8 26l24-10 24 10v24L32 60 8 50z\" fill=\"#C99A5B\" stroke=\"#7A4E2D\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M8 26l24 10 24-10M32 36v24\" stroke=\"#7A4E2D\" stroke-width=\"2\" fill=\"none\"/><path d=\"M8 26l-4-9 24-9 4 8zM56 26l4-9-24-9-4 8z\" fill=\"#DDB27A\" stroke=\"#7A4E2D\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"38\" y=\"40\" width=\"12\" height=\"8\" rx=\"1\" fill=\"#FBF6E9\" transform=\"rotate(-22 44 44)\"/>", "puzzel": "<path d=\"M12 18h12a6 6 0 1 1 12 0h12v12a6 6 0 1 1 0 12v12H36a6 6 0 1 0-12 0H12V42a6 6 0 1 0 0-12z\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/>", "dobbelsteen": "<g transform=\"rotate(-10 32 32)\"><rect x=\"12\" y=\"12\" width=\"40\" height=\"40\" rx=\"8\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><g fill=\"#1F2333\"><circle cx=\"22\" cy=\"22\" r=\"3.4\"/><circle cx=\"42\" cy=\"22\" r=\"3.4\"/><circle cx=\"32\" cy=\"32\" r=\"3.4\"/><circle cx=\"22\" cy=\"42\" r=\"3.4\"/><circle cx=\"42\" cy=\"42\" r=\"3.4\"/></g></g>", "controller": "<path d=\"M18 22h28c7 0 12 6 13 15l1 8c1 7-6 10-10 5l-5-6H19l-5 6c-4 5-11 2-10-5l1-8c1-9 6-15 13-15z\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M19 30v10M14 35h10\" stroke=\"#F2DDA0\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><circle cx=\"44\" cy=\"31\" r=\"3\" fill=\"#C8323C\"/><circle cx=\"50\" cy=\"37\" r=\"3\" fill=\"#E9B949\"/>", "potlood": "<g transform=\"rotate(40 32 32)\"><rect x=\"25\" y=\"4\" width=\"14\" height=\"40\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"25\" y=\"4\" width=\"14\" height=\"7\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M25 44l7 14 7-14z\" fill=\"#F1D9B5\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M30 54l2 4 2-4z\" fill=\"#1F2333\"/><path d=\"M32 11v33\" stroke=\"#B8862F\" stroke-width=\"1.5\"/></g>", "ster": "<path d=\"M32 6l7.6 16.4 17.9 2.1-13.3 12.2 3.6 17.7L32 45.6l-15.8 8.8 3.6-17.7L6.5 24.5l17.9-2.1z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M24 30a8 8 0 0 0 16 0\" stroke=\"#1F2333\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>", "hamer": "<g transform=\"rotate(-35 32 32)\"><rect x=\"28\" y=\"20\" width=\"8\" height=\"40\" rx=\"3\" fill=\"#B5793F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"14\" y=\"8\" width=\"36\" height=\"14\" rx=\"3\" fill=\"#8C939E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"44\" y=\"6\" width=\"8\" height=\"18\" rx=\"2\" fill=\"#6F7785\" stroke=\"#1F2333\" stroke-width=\"2\"/></g>", "vlaai": "<defs><clipPath id=\"vlaai-icoon-knip\"><circle cx=\"31\" cy=\"32\" r=\"19\"/></clipPath></defs><ellipse cx=\"34\" cy=\"37\" rx=\"28\" ry=\"25\" fill=\"#1F2333\" opacity=\".18\"/><circle cx=\"31\" cy=\"32\" r=\"27\" fill=\"#C98A43\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"31\" cy=\"32\" r=\"23.5\" fill=\"none\" stroke=\"#E0AE66\" stroke-width=\"3.2\" stroke-dasharray=\"4 2.6\"/><circle cx=\"31\" cy=\"32\" r=\"19\" fill=\"#A8162B\"/><g clip-path=\"url(#vlaai-icoon-knip)\" stroke=\"#E0AE66\" stroke-width=\"3.6\"><g transform=\"rotate(45 31 32)\"><path d=\"M8 24h46M8 32h46M8 40h46\"/></g><g transform=\"rotate(-45 31 32)\"><path d=\"M8 24h46M8 32h46M8 40h46\"/></g></g>", "hotel": "<rect x=\"10\" y=\"14\" width=\"44\" height=\"44\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"6\" y=\"10\" width=\"52\" height=\"6\" fill=\"#23252B\"/><g fill=\"#9FD3E8\" stroke=\"#1F2333\" stroke-width=\"1.5\"><rect x=\"15\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"28\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"41\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"15\" y=\"34\" width=\"8\" height=\"8\"/><rect x=\"41\" y=\"34\" width=\"8\" height=\"8\"/></g><rect x=\"27\" y=\"40\" width=\"10\" height=\"18\" fill=\"#7A4E2D\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><path d=\"M24 38h16l2 4H22z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><rect x=\"18\" y=\"4\" width=\"28\" height=\"7\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><g fill=\"#1F2333\"><rect x=\"21\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"25\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"29\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"33\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"37\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"41\" y=\"6\" width=\"2\" height=\"3\"/></g>", "beker": "<path d=\"M20 10h24v14a12 12 0 0 1-24 0z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M20 14h-6a6 6 0 0 0 6 10M44 14h6a6 6 0 0 1-6 10\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><path d=\"M29 36h6v8h-6z\" fill=\"#C99A2E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"22\" y=\"44\" width=\"20\" height=\"7\" rx=\"1.5\" fill=\"#7A4E2D\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M27 15v9\" stroke=\"#FFF3C4\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M32 52v0\" /><rect x=\"27\" y=\"46\" width=\"10\" height=\"3\" fill=\"#E9B949\"/>", "pakje": "<path d=\"M14 8l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4v52l-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4z\" fill=\"#2F8BD6\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"16\" y=\"14\" width=\"34\" height=\"8\" rx=\"1.5\" fill=\"#23252B\"/><rect x=\"17\" y=\"25\" width=\"32\" height=\"26\" rx=\"3\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><path d=\"M33 30l2.5 5.5 6 .6-4.5 4 1.3 5.9L33 43l-5.3 3 1.3-5.9-4.5-4 6-.6z\" fill=\"#E9B949\" stroke=\"#8C6A0A\" stroke-width=\"1.2\"/><path d=\"M14 8h40\" stroke=\"#6EE8F0\" stroke-width=\"2\" stroke-dasharray=\"3 3\"/><rect x=\"22\" y=\"54\" width=\"22\" height=\"5\" rx=\"2.5\" fill=\"#1E4F8C\"/>", "steek": "<circle cx=\"31\" cy=\"33\" r=\"27\" fill=\"#E2B47E\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"31\" cy=\"33\" r=\"21.5\" fill=\"#FBF7EF\" stroke=\"#1F2333\" stroke-width=\"2.2\"/><path d=\"M10 25a22 22 0 0 1 12-13\" fill=\"none\" stroke=\"#F6D9A8\" stroke-width=\"2\" stroke-linecap=\"round\"/><rect x=\"25\" y=\"1.5\" width=\"12\" height=\"8\" rx=\"2.5\" fill=\"#B5652F\" stroke=\"#1F2333\" stroke-width=\"2.2\"/><circle cx=\"31\" cy=\"5.5\" r=\"1.6\" fill=\"#F6CB2F\"/><circle cx=\"17\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"17\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"17\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"22\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"17\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"27\" cy=\"47\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"17\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"32\" cy=\"47\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"17\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"37\" cy=\"47\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"22\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"42\" cy=\"42\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"47\" cy=\"27\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"47\" cy=\"32\" r=\".6\" fill=\"#C9B79A\"/><circle cx=\"47\" cy=\"37\" r=\".6\" fill=\"#C9B79A\"/><path d=\"M18.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#F28CA0\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M23.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#F28CA0\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M33.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M38.7 22.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M18.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#F28CA0\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M23.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M28.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M33.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M38.7 27.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M23.7 32.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M28.7 32.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M33.7 32.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M28.7 37.7l4.6 4.6m0-4.6l-4.6 4.6\" stroke=\"#D9455F\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M31 41c4 6 10 9 17 8\" fill=\"none\" stroke=\"#E8577A\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M46 50l13 9\" stroke=\"#1F2333\" stroke-width=\"4.2\" stroke-linecap=\"round\"/><path d=\"M46 50l13 9\" stroke=\"#D8DEE4\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><ellipse cx=\"48.4\" cy=\"51.7\" rx=\"1.6\" ry=\".8\" transform=\"rotate(35 48.4 51.7)\" fill=\"#1F2333\"/>", "recht": "<rect x=\"12\" y=\"20\" width=\"40\" height=\"32\" rx=\"2.5\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-dasharray=\"3.2 3\" opacity=\".4\"/><g transform=\"rotate(-13 32 9)\"><path d=\"M32 9L19 21M32 9L45 21\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><rect x=\"12\" y=\"20\" width=\"40\" height=\"32\" rx=\"2.5\" fill=\"#C99566\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><rect x=\"17.5\" y=\"25.5\" width=\"29\" height=\"21\" fill=\"#C3D8EB\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M17.5 39.5c5-4.5 10-5.5 15-3s9.5 2.5 14 .5v9.5h-29z\" fill=\"#9CC6A6\"/><path d=\"M22 39v-5l3.5-3 3.5 3v5\" fill=\"#E0857A\" stroke=\"#1F2333\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><circle cx=\"40.5\" cy=\"30.5\" r=\"3\" fill=\"#F2D58C\" stroke=\"#1F2333\" stroke-width=\"1.2\"/></g><circle cx=\"32\" cy=\"9\" r=\"2.8\" fill=\"#BDC5CD\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M38 60.5c7 1.2 13.5-.8 18-6.5\" fill=\"none\" stroke=\"#7FB08F\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M51.5 53.2l4.8.6.4 4.6\" fill=\"none\" stroke=\"#7FB08F\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>", "opgevoel": "<path d=\"M2.5 46a29.5 29.5 0 0 1 59 0z\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M9 46a23 23 0 0 1 6.74-16.26\" fill=\"none\" stroke=\"#C8323C\" stroke-width=\"7.5\"/><path d=\"M15.74 29.74a23 23 0 0 1 32.52 0\" fill=\"none\" stroke=\"#E9B949\" stroke-width=\"7.5\"/><path d=\"M48.26 29.74A23 23 0 0 1 55 46\" fill=\"none\" stroke=\"#2E8B62\" stroke-width=\"7.5\"/><path d=\"M32 46l15.5-13.5\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"32\" cy=\"46\" r=\"5.5\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><rect x=\"1.5\" y=\"46\" width=\"61\" height=\"10\" rx=\"3.5\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2.8\"/><path d=\"M54 3l2.3 5.2 5.2 2.3-5.2 2.3L54 18l-2.3-5.2-5.2-2.3 5.2-2.3z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/>", "mengelmoes": "<g transform=\"rotate(-9 21 37)\"><rect x=\"7.5\" y=\"24.5\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#2F5BD3\"/><rect x=\"5\" y=\"22\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#A9C8FF\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M19.5 28.5c-4 4.8-6.2 8-6.2 11a6.2 6.2 0 0 0 12.4 0c0-3-2.2-6.2-6.2-11z\" fill=\"#2F5BD3\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"M16.6 39.6a3 3 0 0 0 2.2 2.8\" fill=\"none\" stroke=\"#FBF6E9\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></g><g transform=\"rotate(10 43 29)\"><rect x=\"31.5\" y=\"16.5\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#FF4FA3\"/><rect x=\"29\" y=\"14\" width=\"29\" height=\"29\" rx=\"8\" fill=\"#FFE27A\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M43.6 19.5c.8 4 6.4 6.3 6.4 12.2a6.4 6.4 0 0 1-12.8 0c0-3.2 1.9-4.6 3-6.6 1 1.9 1.8 2.8 2.9 3.1.9-2.9.9-5.6.5-8.7z\" fill=\"#FF7A2E\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"M43.2 35.7c-1.4 0-2.4-1-2.4-2.4 0-1.2.8-2 1.5-3 .5 1 1 1.4 1.7 1.6.6-.6.9-1.3 1-2.1.7.9 1.1 1.8 1.1 2.8 0 1.8-1.3 3.1-2.9 3.1z\" fill=\"#FFD60A\"/></g><path d=\"M50.5 47.5l2.2 5.4 5.4 2.2-5.4 2.2-2.2 5.4-2.2-5.4-5.4-2.2 5.4-2.2z\" fill=\"#FF4FA3\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><circle cx=\"9\" cy=\"10\" r=\"2.2\" fill=\"#00A57A\"/><circle cx=\"16\" cy=\"6.5\" r=\"1.5\" fill=\"#FF4FA3\"/><circle cx=\"14.5\" cy=\"13\" r=\"1.2\" fill=\"#2F5BD3\"/>", "wheels": "<path d=\"M4 24h14M2 33h12M5 42h11\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"38\" cy=\"33\" r=\"23\" fill=\"#1F2333\"/><circle cx=\"38\" cy=\"33\" r=\"18\" fill=\"#F28C28\"/><circle cx=\"38\" cy=\"33\" r=\"13\" fill=\"#4A2818\"/><path d=\"M38 20v26M25 33h26M29 24l18 18M47 24L29 42\" stroke=\"#F2DDA0\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><circle cx=\"38\" cy=\"33\" r=\"6\" fill=\"#F6F0E4\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"36\" cy=\"32\" r=\"1.4\" fill=\"#1F2333\"/><circle cx=\"40\" cy=\"32\" r=\"1.4\" fill=\"#1F2333\"/>", "steiger": "<path d=\"M14 58V12M50 58V12M14 26h36M14 44h36M14 26l36 18\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"7\" stroke-linecap=\"round\"/><path d=\"M14 58V12M50 58V12M14 26h36M14 44h36M14 26l36 18\" fill=\"none\" stroke=\"#B8C0C8\" stroke-width=\"3.6\" stroke-linecap=\"round\"/><rect x=\"6\" y=\"6\" width=\"52\" height=\"9\" rx=\"2.5\" fill=\"#E0A64E\" stroke=\"#1F2333\" stroke-width=\"3\"/><path d=\"M18 10.5h6M32 10.5h6M46 10.5h4\" stroke=\"#B07A2E\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"14\" cy=\"26\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"50\" cy=\"44\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"14\" cy=\"44\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"50\" cy=\"26\" r=\"3.2\" fill=\"#2F6FB5\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "fiets": "<circle cx=\"17\" cy=\"42\" r=\"11\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"4\"/><circle cx=\"47\" cy=\"42\" r=\"11\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"4\"/><circle cx=\"17\" cy=\"42\" r=\"2.5\" fill=\"#8C939E\"/><circle cx=\"47\" cy=\"42\" r=\"2.5\" fill=\"#8C939E\"/><path d=\"M17 42l10-18h16l4 18M27 24l8 18h-18M43 24l-2-7h-6\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M17 42l10-18h16l4 18M27 24l8 18h-18M43 24l-2-7h-6\" fill=\"none\" stroke=\"#8E1F2A\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M22 20h10\" stroke=\"#1F2333\" stroke-width=\"4.5\" stroke-linecap=\"round\"/><path d=\"M33 13h8\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linecap=\"round\"/><path d=\"M46 8c3 0 6 2 6 5\" fill=\"none\" stroke=\"#E9B949\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M49 4c5 1 8 4 8 9\" fill=\"none\" stroke=\"#E9B949\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>", "bel": "<circle cx=\"20\" cy=\"18\" r=\"10\" fill=\"#E8414E\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"40\" cy=\"18\" r=\"10\" fill=\"#3A86E8\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"30\" cy=\"34\" r=\"10\" fill=\"#F5C330\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><circle cx=\"16\" cy=\"14\" r=\"3\" fill=\"#fff\" opacity=\".7\"/><circle cx=\"36\" cy=\"14\" r=\"3\" fill=\"#fff\" opacity=\".7\"/><circle cx=\"26\" cy=\"30\" r=\"3\" fill=\"#fff\" opacity=\".7\"/><path d=\"M32 60V50\" stroke=\"#1F2333\" stroke-width=\"7\" stroke-linecap=\"round\"/><circle cx=\"32\" cy=\"48\" r=\"7\" fill=\"#3DB06A\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M22 60h20\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "rob": "<path d=\"M6 12q0-6 6-6h40q6 0 6 6v20q0 6-6 6H26l-10 9v-9h-4q-6 0-6-6z\" fill=\"#FFE76A\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><text x=\"32\" y=\"29\" text-anchor=\"middle\" font-family=\"Impact, Arial Black, sans-serif\" font-size=\"16\" font-weight=\"900\" fill=\"#C8323C\" transform=\"rotate(-6 32 26)\">ROB</text><path d=\"M38 60h14q3 0 3-3l2-10q0-3-3-3h-7l1-6q0-4-3-4l-6 9v17z\" fill=\"#F2C2A8\" stroke=\"#1F2333\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/><rect x=\"32\" y=\"45\" width=\"6\" height=\"15\" rx=\"1.5\" fill=\"#2F6FD6\" stroke=\"#1F2333\" stroke-width=\"2.4\"/>", "arend": "<circle cx=\"32\" cy=\"32\" r=\"26\" fill=\"#8EC5EE\" stroke=\"#1F2333\" stroke-width=\"3\"/><path d=\"M14 50h36\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><path d=\"M28 50l4-30 4 30z\" fill=\"#7A6248\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M27 40h10M29 30h6\" stroke=\"#1F2333\" stroke-width=\"1.8\"/><path d=\"M10 26q10-8 18-2l4 3 4-3q8-6 18 2q-8 0-12 6l-10 2-10-2q-4-6-12-6z\" fill=\"#5A3A22\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"32\" cy=\"27\" r=\"3.2\" fill=\"#F4F0E6\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M32 29l1.6 2.4h-3.2z\" fill=\"#E9B949\"/>", "rommelkroon": "<rect x=\"6\" y=\"6\" width=\"52\" height=\"52\" rx=\"5\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"3\"/><path d=\"M6 23h52M6 40h52M23 6v52M40 6v52\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"7.5\" y=\"7.5\" width=\"15\" height=\"15\" fill=\"#F4A6A6\"/><rect x=\"40.5\" y=\"24\" width=\"16\" height=\"15\" fill=\"#A9C4F5\"/><rect x=\"24\" y=\"41\" width=\"15\" height=\"15.5\" fill=\"#B8E0A0\"/><path d=\"M27 34l-1.5-10 5 4 3.5-7 3.5 7 5-4-1.5 10z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M45 13l7 7M52 13l-7 7\" stroke=\"#1F2333\" stroke-width=\"2.4\" stroke-linecap=\"round\" opacity=\".6\"/>", "ritme": "<rect x=\"8\" y=\"22\" width=\"26\" height=\"26\" rx=\"3\" fill=\"#8AFF6A\" stroke=\"#1F2333\" stroke-width=\"3\"/><rect x=\"14\" y=\"30\" width=\"4\" height=\"5\" fill=\"#1F2333\"/><rect x=\"24\" y=\"30\" width=\"4\" height=\"5\" fill=\"#1F2333\"/><rect x=\"15\" y=\"39\" width=\"12\" height=\"2.6\" fill=\"#1F2333\"/><path d=\"M44 10v24\" stroke=\"#1F2333\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><path d=\"M44 10l12 4v7l-12-4\" fill=\"#FF5AA8\" stroke=\"#1F2333\" stroke-width=\"2.6\" stroke-linejoin=\"round\"/><ellipse cx=\"40\" cy=\"35\" rx=\"5.5\" ry=\"4.2\" fill=\"#FF5AA8\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M4 56h56\" stroke=\"#5EE6FF\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M44 56l6-8 6 8z\" fill=\"#1F2333\"/>", "vlieger": "<path d=\"M6 34L58 8 34 56l-6-16z\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M58 8L28 40l-22-6z\" fill=\"#DCE4F5\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M58 8L28 40l6 16\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M4 50q8-4 14 0M10 58q6-3 12 0\" fill=\"none\" stroke=\"#5EC2E8\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "blok": "<path d=\"M32 6L56 18 32 30 8 18z\" fill=\"#5FA83E\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 18l24 12v28L8 46z\" fill=\"#8A5A36\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M56 18L32 30v28l24-12z\" fill=\"#6E4426\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 18l24 12 24-12\" fill=\"none\" stroke=\"#7CC452\" stroke-width=\"2\"/><path d=\"M14 24v6M22 28v8M42 30v6M50 26v8\" stroke=\"#5FA83E\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "pretpark": "<circle cx=\"32\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"#C8323C\" stroke-width=\"4\"/><circle cx=\"32\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"1.5\" opacity=\".6\"/><path d=\"M32 6v40M12 26h40M18 12l28 28M46 12L18 40\" stroke=\"#E9B949\" stroke-width=\"2.5\"/><circle cx=\"32\" cy=\"26\" r=\"4\" fill=\"#1F2333\"/><path d=\"M20 58l12-32 12 32\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linejoin=\"round\"/><rect x=\"6\" y=\"56\" width=\"52\" height=\"5\" rx=\"2\" fill=\"#2E8B62\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"27\" y=\"2\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#2F8BD6\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"47\" y=\"22\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#F6CB2F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"7\" y=\"22\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#E8577A\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "duiker": "<defs><linearGradient id=\"duiker-zee\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#5FBCD6\"/><stop offset=\"1\" stop-color=\"#1B5C80\"/></linearGradient></defs><circle cx=\"32\" cy=\"32\" r=\"29\" fill=\"url(#duiker-zee)\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M6 46c6-3 10 2 16 0M42 50c5-2 9 1 14-1\" stroke=\"#BFE6F2\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/><ellipse cx=\"16\" cy=\"38\" rx=\"3\" ry=\"4\" fill=\"#DCA686\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><ellipse cx=\"48\" cy=\"38\" rx=\"3\" ry=\"4\" fill=\"#DCA686\" stroke=\"#1F2333\" stroke-width=\"1.6\"/><path d=\"M17 32c0 14 6 23 15 23s15-9 15-23c0-8-6-12-15-12s-15 4-15 12z\" fill=\"#EFC6A6\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M15 31c-1-12 7-20 18-20 9 0 15 5 16 12l-2 6c-3-5-7-8-12-8-6 0-9 2-14 3l-3 8z\" fill=\"#33231C\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M21 19c5-5 14-6 21-2M25 23c4-3 9-3 13-2\" stroke=\"#6A4E3C\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"14\" y=\"27\" width=\"36\" height=\"14\" rx=\"6\" fill=\"#22262E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"17\" y=\"29.5\" width=\"30\" height=\"9\" rx=\"4\" fill=\"#9FD3E0\"/><path d=\"M19 30.5h11l-1.2 5.5c-.4 1.6-2 2-4.5 2s-4-.6-4.6-2z M34 30.5h11l-.7 5.5c-.6 1.6-2.1 2-4.6 2s-4.1-.4-4.5-2z\" fill=\"none\" stroke=\"#8A93A3\" stroke-width=\"1.4\"/><circle cx=\"25\" cy=\"33.5\" r=\"1.6\" fill=\"#2A201C\"/><circle cx=\"39\" cy=\"33.5\" r=\"1.6\" fill=\"#2A201C\"/><path d=\"M20 31l3-.5\" stroke=\"#FFFFFF\" stroke-width=\"1.2\" stroke-linecap=\"round\"/><path d=\"M24 45.5c3-1.2 5-1.2 8-.2 3-1 5-1 8 .2\" stroke=\"#4B3629\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"27\" y=\"47\" width=\"10\" height=\"4.5\" rx=\"2\" fill=\"#22262E\" stroke=\"#1F2333\" stroke-width=\"1.2\"/><path d=\"M29 53.5c1 1.6 5 1.6 6 0\" stroke=\"#4B3629\" stroke-width=\"2.6\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"51\" cy=\"17\" r=\"3\" fill=\"#CFF4FF\" stroke=\"#1F2333\" stroke-width=\"1.4\"/><circle cx=\"55\" cy=\"10\" r=\"2\" fill=\"#CFF4FF\" stroke=\"#1F2333\" stroke-width=\"1.2\"/>", "idee": "<rect x=\"10\" y=\"22\" width=\"44\" height=\"34\" rx=\"4\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><rect x=\"18\" y=\"28\" width=\"28\" height=\"6\" rx=\"3\" fill=\"#1F2333\"/><path d=\"M14 56h36v4H14z\" fill=\"#9E2430\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"44\" cy=\"16\" r=\"11\" fill=\"#FFE76A\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><path d=\"M40 26h8v5h-8z\" fill=\"#9AA6C2\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M41 15q3-4 6 0\" stroke=\"#E9B949\" stroke-width=\"2\" fill=\"none\"/><path d=\"M44 1v-3M55 6l3-2M33 6l-3-2M58 16h3M30 16h-3\" stroke=\"#E9B949\" stroke-width=\"2.5\" stroke-linecap=\"round\" transform=\"translate(0 2)\"/><rect x=\"20\" y=\"40\" width=\"24\" height=\"10\" rx=\"2\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M20 40l12 6 12-6\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "label": "<path d=\"M14 10h24l16 16-24 28-20-18z\" fill=\"#F2DDA0\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\" transform=\"rotate(8 32 32)\"/><circle cx=\"24\" cy=\"21\" r=\"4\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M24 17c-6-8-14-6-16-1\" stroke=\"#1F2333\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>", "reclame": "<rect x=\"10\" y=\"8\" width=\"32\" height=\"52\" rx=\"6\" fill=\"#1F2333\"/><rect x=\"14\" y=\"14\" width=\"24\" height=\"38\" rx=\"3\" fill=\"#FBF6E9\"/><path d=\"M22 25 L32 33 L22 41 Z\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"26\" cy=\"56\" r=\"1.8\" fill=\"#6A6F80\"/><path d=\"M47.0 4.0 L49.9 8.0 L54.6 6.5 L54.7 11.4 L59.4 13.0 L56.5 17.0 L59.4 21.0 L54.7 22.6 L54.6 27.5 L49.9 26.0 L47.0 30.0 L44.1 26.0 L39.4 27.5 L39.3 22.6 L34.6 21.0 L37.5 17.0 L34.6 13.0 L39.3 11.4 L39.4 6.5 L44.1 8.0Z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><rect x=\"45.4\" y=\"10\" width=\"3.2\" height=\"9\" rx=\"1.6\" fill=\"#1F2333\"/><circle cx=\"47\" cy=\"23\" r=\"1.9\" fill=\"#1F2333\"/>", "huis": "<circle cx=\"32\" cy=\"32\" r=\"29\" fill=\"#F2DDA0\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M23 42l-3 13M41 42l3 13M19 51h7M38 51h7\" stroke=\"#7A4E2D\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"17\" y=\"24\" width=\"30\" height=\"19\" rx=\"1.5\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><path d=\"M12 26L32 9l20 17z\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/><rect x=\"23\" y=\"28\" width=\"18\" height=\"12\" fill=\"#3B4C6E\" stroke=\"#1F2333\" stroke-width=\"1.8\"/><path d=\"M26 40v-5l2-4 2 3h4l2-3 2 4v5z\" fill=\"#7F796B\" stroke=\"#1F2333\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><circle cx=\"29.6\" cy=\"36.4\" r=\"1\" fill=\"#D0CC7C\"/><circle cx=\"34.4\" cy=\"36.4\" r=\"1\" fill=\"#D0CC7C\"/><path d=\"M31.3 38.2h1.4l-.7.8z\" fill=\"#D88F7E\"/><path d=\"M40 41c1.5 3-.5 5.5 2 8\" stroke=\"#40342A\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M41.6 46.6c.3 1.3.4 2 .9 2.6\" stroke=\"#B28B5C\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M38 18l1-6h4v9\" fill=\"#B5B0A4\" stroke=\"#1F2333\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/>"};
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
    { id: 'snel', naam: 'Snel een potje', kort: 'Snel een potje', paginas: ['huisopstelten', 'opgevoel', 'rommelwheels', 'productiefiets', 'vouwvlieger', 'rommelritme', 'rommelpoker', 'rob'], woorden: /ritme|kaart|vlieg|race|arcade|fiets|ren/ },
    { id: 'puzzels', naam: 'Puzzels', kort: 'Puzzels', paginas: ['rommelgroepjes', 'reclame', 'steigerstress', 'rommelwoord', 'rommelkroon', 'rommelbel'], woorden: /puzzel|woord|raad|denk|steiger|reclame/ },
    { id: 'rustig', naam: 'Even rustig', kort: 'Rustig', paginas: ['rommelrecht', 'rommelsteek'], woorden: /rustig|borduur|steek|ontspan|kleur/ },
    { id: 'meer', naam: 'Rond het rommelhoekje', kort: 'Meer', paginas: ['scorebord', 'ideeenbox'], woorden: /tool|bord|box|idee|score/ },
  ];
  const pagina = a => ((a.getAttribute('href') || '').split('/').pop() || '').replace(/\.html?$/, '').toLowerCase();
  const leesJSON = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
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
    rommelarend: () => { const s = leesJSON('rommelarend-v1'), t = totaal(s, 18); const n = s && s.ontdekt ? s.ontdekt.length : 0; return n ? [n + ' van ' + t + ' plekken in Parijs', Math.min(1, n / t)] : null; },
    rommelsteek: () => { const s = leesJSON('rommelsteek-v1'); if (!s) return null; const ids = Object.keys(s.af || {}), af = ids.length, vast = ids.filter(k => !/^dag/.test(k)).length, bezig = Object.values(s.werk || {}).filter(w => w.includes('1') && w.includes('0')).length; return af || bezig ? [af ? af + ' borduurwerk' + (af === 1 ? '' : 'en') + ' af' : 'Borduurwerk onderhanden', Math.min(1, vast / totaal(s, 113)) || null] : null; },
    rommelgroepjes: () => { const s = leesJSON('rommelgroepjes-v1'); if (!s || !s.p) return null; let n = 0; try { const m = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/); n = Math.round((Date.UTC(+m[1], m[2] - 1, +m[3]) - Date.UTC(2026, 9, 29)) / 864e5) + 1; } catch (e) {} const v = Object.values(s.p).map(String), op = v.filter(x => x[0] === 'w' || x[0] === 'a').length, t = Math.max(1, n, totaal(s, v.length)), x = String(s.p[n] || '')[0] || ''; let r = 0; if (x !== 'v') for (let d = x === 'w' ? n : n - 1; d > 0 && String(s.p[d] || '')[0] === 'w'; d--) r++; return [(x === 'w' ? 'Vandaag opgelost' : x === 'v' ? 'Vandaag niet gelukt' : 'De puzzel van vandaag staat klaar') + (r > 1 ? ' · reeks van ' + r + ' dagen' : ''), Math.min(1, op / t)]; },
    opgevoel: () => { const s = leesJSON('opgevoel-v1'); if (!s || !s.stat || !s.stat.dag || !s.stat.dag.n) return null; const d = new Date(), k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'), v = s.dagen && s.dagen[k]; return [v ? 'Vandaag ' + v.t + ' van 500' : 'De dagronde van vandaag staat klaar', (v ? v.t : s.stat.dag.best) / 500]; },
    rommelrecht: () => { const s = leesJSON('rommelrecht-v1'), t = totaal(s, 139); if (!s) return null; const n = Object.keys(s.gehaald || {}).filter(k => !k.startsWith('dag-')).length; return n ? [n + ' van ' + t + ' puzzels netjes', Math.min(1, n / t)] : null; },
    mengelmoes: () => { const s = leesJSON('mengelmoes-v1'); if (!s || !Array.isArray(s.el) || s.el.length <= 4) return null; const n = s.el.length, e = s.el.filter(x => x && x[4]).length; return [n + ' stickers' + (e ? ' · ' + e + '× 1e druk' : ''), Math.min(1, n / 500)]; },
    rommelwheels: () => { const s = leesJSON('rommelwheels-v1'); if (!s || !s.levels) return null; let st = 0; for (const r of Object.values(s.levels)) st += (r.gehaald ? 1 : 0) + (r.alle ? 1 : 0) + (r.heel ? 1 : 0); const t = totaal(s, 39); return st ? [st + ' van ' + t + ' sterren', Math.min(1, st / t)] : null; },
    steigerstress: () => { const s = leesJSON('steiger-v1'); if (!s || !s.sterren) return null; const st = Object.values(s.sterren).reduce((a, b) => a + b, 0); return st ? [st + ' van 36 sterren', st / 36] : null; },
    productiefiets: () => { const s = leesJSON('productiefiets-v1'); if (!s || !s.best) return null; return ['Verste rit ' + s.bestMeter + ' m', Math.min(1, s.bestMeter / 5000)]; },
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
  const RADEN = { rommelgroepjes: 'groepjes', reclame: 'reclame', huisopstelten: 'huis', rubendeduiker: 'duiker', rommelland: 'pretpark', rommelblok: 'blok', vouwvlieger: 'vlieger', rommelritme: 'ritme', rommelkroon: 'rommelkroon', rommelarend: 'arend', rob: 'rob', rommelbel: 'bel', rommelsteek: 'steek', productiefiets: 'fiets', steigerstress: 'steiger', rommelwheels: 'wheels', mengelmoes: 'mengelmoes', opgevoel: 'opgevoel', rommelrecht: 'recht', rommelbeesten: 'pakje', rommelhotel: 'hotel', vlaaienbakker: 'vlaai', rommelpoker: 'kaarten', rommelwoord: 'woord', scorebord: 'beker', ideeenbox: 'idee' };
  document.querySelectorAll('.label-kaart[href]').forEach(a => { const g = RADEN[pagina(a)]; if (g && (typeof SPELICONEN === 'undefined' || !SPELICONEN[a.dataset.icoon] || a.dataset.icoon === 'doos')) a.dataset.icoon = g; });
  plek.querySelectorAll('[data-icoon]').forEach(s => { const a = labels.map(l => l.querySelector('.label-kaart')).find(x => x && x.getAttribute('href') === (s.closest('a') || {}).getAttribute?.('href')); if (a) s.dataset.icoon = a.dataset.icoon; });
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
    sessionStorage.removeItem('koppel-herstel'); sessionStorage.removeItem('koppel-herstel-v'); if (!['koppel-hulp', 'koppel-vervangen', 'koppel-samen', 'koppel-geweigerd'].some(x => sessionStorage.getItem(x))) sessionStorage.setItem('koppel-melding', '1'); } } catch (e) {}
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
  const LOG_SPEL = { vlaai: 1 }, NIEUW_BORD = { oerknal: 1, vbpres: 1 };
  const vkey = spel => (LOG_SPEL[spel] ? spel + '~log' : spel);
  const BRONNEN = {
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
    kroon: () => { const s = lees('rommelkroon-v1'); if (!s || !s.opgelost) return null; const o = Object.values(s.opgelost); return o.length ? [o.length, o.reduce((a, x) => a + x.tijd, 0)] : null; },
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
        if (!r.ok && j.fout && !NIEUW_BORD[spel]) document.dispatchEvent(new CustomEvent('scorebord-fout', { detail: j.fout }));
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
  };
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
  const SLEUTELS = ['vlaaienbakker-v1', 'rommelwoord-stats-v1', 'rommelwoord-dag-v1', 'rommelpoker-record', 'rommelpoker-spel-v2', 'rommelbeesten-v1', 'rommelhotel-v1', 'rommelland-v1', 'rommelblok-v2', 'rommelblok-v3', 'rommelblok-taal', 'vouwvlieger-v1', 'rommelritme-v1', 'rommelkroon-v1', 'rommelarend-v1', 'rommelrob-v1', 'rommelbel-v1', 'rommelsteek-v1', 'productiefiets-v1', 'steiger-v1', 'rommelwheels-v1', 'mengelmoes-v1', 'opgevoel-v1', 'rommelrecht-v1', 'rubendeduiker-v1', 'huisopstelten-v1', 'reclame-v1', 'rommelgroepjes-v1', 'rommelhoekje-thema', 'vlaaienbakker-week-v1', 'rommelhoekje-speler', 'rommelhoekje-eitjes', 'gereedschap-v2'];
  const MAX = 380000;
  const leesK = () => { try { return JSON.parse(localStorage.getItem(KKEY) || 'null'); } catch (e) { return null; } };
  const schrijfK = K => { try { if (K) localStorage.setItem(KKEY, JSON.stringify(K)); else localStorage.removeItem(KKEY); } catch (e) {} };
  const hash = t => { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36) + ':' + t.length; };
  const pagina = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  const vanDezePagina = k => pagina && pagina !== 'index' && k.startsWith(pagina);
  let bezigK = false, eersteK = true;
  const APPARAAT = (() => { try { let a = localStorage.getItem('rommel-apparaat'); if (!a) { a = Array.from(crypto.getRandomValues(new Uint8Array(12)), x => x.toString(16).padStart(2, '0')).join(''); localStorage.setItem('rommel-apparaat', a); } return a; } catch (e) { return ''; } })();
  async function koppelSync(stil, opties) {
    opties = opties || {};
    const K0 = leesK(); if (!K0 || !K0.code || bezigK) return null;
    const inst = await klaar; const url = (inst.scoreUrl || '').replace(/\/+$/, ''); if (!url) return null;
    bezigK = true;
    try {
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
    } catch (e) { return null; } finally { bezigK = false; eersteK = false; }
  }
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
    schrijfK({ uit: true, sinds: Date.now() });
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
    const rij = document.createElement('div'); rij.className = 'kp-rij'; const knop = document.createElement('button'); knop.type = 'button'; knop.className = 'kp-knop hoofd'; knop.textContent = cadeau ? 'Dank je wel!' : 'Fijn, dank je!'; rij.appendChild(knop); binnen.appendChild(rij); d.appendChild(binnen);
    let klaarGezien = false;
    const gezien = () => { if (klaarGezien) return; klaarGezien = true; const H = leesH(); for (const b of lijst) if (!H.gezien.includes(b.nr)) H.gezien.push(b.nr); schrijfH(H); setTimeout(() => koppelSync(true), 400); };
    knop.onclick = () => { gezien(); if (d.open) d.close(); d.remove(); };
    d.addEventListener('close', () => { gezien(); d.remove(); });
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
    knop.focus();
  }
  async function gebruikCode(code) {
    code = schoon(code); if (code.length < 12) return 'Die code is te kort.';
    const inst = await klaar, u = adres(inst), mis = 'Koppelen lukte niet. Controleer je internet en probeer het opnieuw.'; if (!u) return mis;
    // eerst kijken of er iets bij deze code staat (zonder iets te versturen)
    try { const r = await metTijd(u + '/sync', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ v: 2, code, alleenAantal: 1 }) }); const j = await r.json(); if (!j.ok) return mis; if (!j.aantal) return 'Bij deze code staat nog niets. Klopt hij wel? Maak hem anders op je andere apparaat.'; } catch (e) { return mis; }
    // dan koppelen: wat op allebei staat, beslist de server per spel (de meeste voortgang wint, de andere versie blijft bewaard); wat alleen hier staat, gaat mee
    await vrij(); const oud = leesK(); schrijfK({ code, staat: {}, v: 2 });
    const j = await koppelSync(true, { koppelen: true, herlaad: true });
    if (!j) { schrijfK(oud); return mis; }
    return '';
  }
  // ---------- het venster
  let dlg = null;
  function stijl() { if (document.getElementById('kp-stijl')) return; const st = document.createElement('style'); st.id = 'kp-stijl'; st.textContent = `
    .kp-dlg { border: 0; border-radius: 14px; padding: 0; max-width: min(30rem, 94vw); background: #F2DDA0; color: #231A26; box-shadow: 0 0 0 4px #231A26, 0 10px 0 4px rgba(0,0,0,.35); font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
    .kp-dlg::backdrop { background: rgba(10,14,30,.6); } .kp-in { padding: 1.1rem 1.3rem 1.2rem; } .kp-in h2 { margin: 0 0 .4rem; } .kp-in p { margin: .4rem 0; line-height: 1.45; }
    .kp-code { font-size: 1.4rem; font-weight: 800; letter-spacing: .02em; background: #FBF6E9; border-radius: 8px; padding: .6rem .8rem; text-align: center; margin: .6rem 0; user-select: all; }
    .kp-rij { display: flex; gap: .45rem; flex-wrap: wrap; margin-top: .6rem; } .kp-rij input { flex: 1 1 12rem; font: inherit; padding: .55rem .7rem; border-radius: 6px; border: 2px solid #C9A24E; background: #FBF6E9; }
    .kp-knop { font: inherit; font-weight: 800; border: 0; border-radius: 6px; padding: .55rem .9rem; cursor: pointer; background: #FBF6E9; color: #231A26; box-shadow: 0 2px 0 rgba(0,0,0,.3); } .kp-knop.hoofd { background: #C8323C; color: #fff; }
    .kp-klein { font-size: .82rem; color: #5E5643; } .kp-klein a, .kp-link { color: #9E2430; font: inherit; font-weight: 700; } .kp-link { background: none; border: 0; padding: 0; cursor: pointer; text-decoration: underline; } .kp-fout { color: #C8323C; font-weight: 700; min-height: 1.2em; }
    .kp-melding { position: fixed; left: 50%; bottom: 1rem; transform: translateX(-50%); z-index: 9999; background: #FBF6E9; color: #231A26; font: 700 .92rem 'Bricolage Grotesque', system-ui, sans-serif; padding: .6rem .9rem; border-radius: 10px; box-shadow: 0 0 0 3px #231A26, 0 6px 0 3px rgba(0,0,0,.3); display: flex; gap: .6rem; align-items: center; flex-wrap: wrap; justify-content: center; max-width: 92vw; }
    .kp-knopje { position: fixed; right: .9rem; bottom: .9rem; z-index: 50; font: 800 .88rem 'Bricolage Grotesque', system-ui, sans-serif; border: 0; border-radius: 999px; padding: .55rem .9rem; cursor: pointer; background: #FBF6E9; color: #231A26; box-shadow: 0 0 0 3px #231A26, 0 4px 0 3px rgba(0,0,0,.3); }`; document.head.appendChild(st); }
  function toonKoppelMelding(tekst, knop, doe) { stijl(); const m = document.createElement('div'); m.className = 'kp-melding'; m.setAttribute('role', 'status'); m.innerHTML = `<span>${tekst}</span>${knop ? `<button class="kp-knop hoofd" type="button">${knop}</button>` : ''}`; if (knop) m.querySelector('button').onclick = () => { m.remove(); doe(); }; document.body.appendChild(m); setTimeout(() => m.remove(), knop ? 20000 : 4000); }
  function openKoppel() {
    stijl(); if (!dlg) { dlg = document.createElement('dialog'); dlg.className = 'kp-dlg'; document.body.appendChild(dlg); dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); }
    const K = leesK();
    const geleden = t => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'net' : m < 60 ? m + ' minuten geleden' : Math.round(m / 60) + ' uur geleden'; };
    dlg.innerHTML = K && K.code ? `<div class="kp-in"><h2>Je account</h2><p>Je voortgang staat veilig op de server. Met deze code haal je hem op een ander apparaat op, of terug als je browser leeg is gemaakt. Bewaar hem goed:</p><div class="kp-code">${K.code}</div><p class="kp-klein">Vul deze code in op een ander apparaat om ook daar verder te spelen. ${K.laatst ? 'Laatst gelijkgezet: ' + geleden(K.laatst) + '.' : ''}</p><p class="kp-fout" id="kp-fout"></p><div class="kp-rij"><button class="kp-knop hoofd" id="kp-nu" type="button">Nu gelijkzetten</button><button class="kp-knop" id="kp-los" type="button">Ontkoppelen</button><button class="kp-knop" id="kp-dicht" type="button">Sluiten</button></div><p class="kp-klein" style="margin-top:1rem">Wil je niet dat je voortgang op de server staat? <button class="kp-link" id="kp-weg" type="button">Verwijder mijn gegevens van de server</button>. Lees ook de <a href="privacy.html">privacyverklaring</a>.</p></div>`
      : `<div class="kp-in"><h2>Koppel je apparaten</h2>${K && K.uit ? '<p><b>Je voortgang staat nu alleen op dit apparaat.</b> Er gaat niets naar de server, tot je zelf een koppelcode maakt.</p>' : ''}<p>Speel je op een computer én op een telefoon of tablet? Koppel ze, dan gaat je voortgang in alle spellen mee: je vlaaien, je Rommelbeesten, het hotel, je records en meer.</p><div class="kp-rij"><button class="kp-knop hoofd" id="kp-maak" type="button">Maak een koppelcode</button></div><p style="margin-top:1rem"><b>Heb je al een code?</b> Vul hem hier in:</p><div class="kp-rij"><input id="kp-invoer" placeholder="bijvoorbeeld rode-vlaai-raket-123" autocomplete="off" aria-label="Koppelcode"><button class="kp-knop" id="kp-koppel" type="button">Koppelen</button></div><p class="kp-fout" id="kp-fout"></p><p class="kp-klein">Je voortgang wordt zonder naam bewaard, alleen bij een versleutelde vorm van je code. Iedereen met je code kan je voortgang overnemen, dus deel hem alleen met je eigen apparaten.</p><div class="kp-rij"><button class="kp-knop" id="kp-dicht" type="button">Sluiten</button></div></div>`;
    const q = id => dlg.querySelector('#' + id);
    q('kp-dicht').onclick = () => dlg.close();
    if (q('kp-maak')) q('kp-maak').onclick = async () => { q('kp-maak').disabled = true; q('kp-fout').textContent = 'Even bezig...'; await maakKoppeling(); openKoppel(); };
    if (q('kp-koppel')) { const ga = async () => { q('kp-fout').textContent = 'Even bezig...'; const f = await gebruikCode(q('kp-invoer').value); if (f) q('kp-fout').textContent = f; else openKoppel(); }; q('kp-koppel').onclick = ga; q('kp-invoer').onkeydown = e => { if (e.key === 'Enter') ga(); }; }
    if (q('kp-nu')) q('kp-nu').onclick = async () => { q('kp-fout').textContent = 'Even bezig...'; const j = await koppelSync(true); q('kp-fout').textContent = j ? 'Alles is gelijkgezet.' : 'Dat lukte niet. Controleer je internet.'; };
    if (q('kp-weg')) q('kp-weg').onclick = async () => { if (!confirm('Je gegevens van de server halen?\n\nDan wissen we op de server: je voortgang van alle spellen, je Rommelbeesten-verzameling en, als je meedoet, je naam en scores op het scorebord. Op dit apparaat blijft je voortgang gewoon staan, maar je andere apparaten krijgen hem niet meer.\n\nDit apparaat bewaart daarna niets meer op de server, tot je zelf weer een koppelcode maakt.')) return; q('kp-fout').textContent = 'Even bezig...'; const f = await verwijderAccount(); if (f) { q('kp-fout').textContent = f; return; } openKoppel(); toonKoppelMelding('Je gegevens zijn van de server gehaald.'); };
    if (q('kp-los')) q('kp-los').onclick = () => { if (!confirm('Ontkoppelen? Je voortgang blijft op dit apparaat staan, maar gaat niet meer mee naar je andere apparaten.')) return; schrijfK(null); openKoppel(); };
    if (!dlg.open) dlg.showModal();
  }
  API.koppel = openKoppel; API.koppelSync = koppelSync; API.gebruikCode = gebruikCode;
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
  // iedereen heeft een account: zonder koppelcode maakt dit apparaat er zelf een, en bewaart de server de voortgang
  setTimeout(() => { const K = leesK(); if (!K || (!K.code && !K.uit)) maakKoppeling().catch(() => {}); }, 2500);
  // werd een opslag geweigerd (valsspelen)? Dan even uitleggen waarom de stand terug is gezet
  try { if (sessionStorage.getItem('koppel-vervangen')) { sessionStorage.removeItem('koppel-vervangen'); addEventListener('load', () => setTimeout(() => toonKoppelMelding('Je voortgang van je andere apparaat is opgehaald: daar was je verder.'), 900)); } } catch (e) {}
  try { if (sessionStorage.getItem('koppel-samen')) { sessionStorage.removeItem('koppel-samen'); addEventListener('load', () => setTimeout(() => toonKoppelMelding('Wat je op je andere apparaat deed, is erbij gezet.'), 900)); } } catch (e) {}
  try { const w = sessionStorage.getItem('koppel-geweigerd'); if (w) { sessionStorage.removeItem('koppel-geweigerd'); addEventListener('load', () => setTimeout(() => alert('Je voortgang ging sneller dan de server kon controleren (' + w + '), dus hij is teruggezet naar de laatste goedgekeurde stand.\n\nSpeel je hetzelfde spel in twee tabbladen of op twee apparaten tegelijk? Gebruik er dan één tegelijk, dan gebeurt dit niet meer. Klopt er iets niet, laat het Ruben weten via de ideeënbox.'), 400)); } } catch (e) {}
  // op de homepage en het scorebord een knopje
  if (['index', '', 'scorebord'].includes(pagina)) addEventListener('DOMContentLoaded', () => { stijl(); const b = document.createElement('button'); b.className = 'kp-knopje'; b.type = 'button'; b.textContent = (leesK() || {}).code ? 'Apparaten gekoppeld' : 'Koppel je apparaten'; b.onclick = () => { openKoppel(); }; document.body.appendChild(b); });
  try { const hb = sessionStorage.getItem('koppel-hulp'); if (hb) { sessionStorage.removeItem('koppel-hulp'); const lijst = JSON.parse(hb); addEventListener('load', () => setTimeout(() => { toonHulp(lijst); setTimeout(() => koppelSync(true), 1500); }, 500)); } } catch (e) {}
  try { if (sessionStorage.getItem('koppel-melding')) { sessionStorage.removeItem('koppel-melding'); addEventListener('DOMContentLoaded', () => toonKoppelMelding('Je voortgang van je andere apparaat is opgehaald.')); } } catch (e) {}
  klaar.then(() => setTimeout(() => koppelSync(false), 600));
  setInterval(() => { if (!document.hidden) koppelSync(true); }, 30000);
  // eerst het spel laten opslaan, dan pas meesturen
  document.addEventListener('visibilitychange', () => { if (document.hidden) setTimeout(() => koppelSync(true), 400); });
  // bij het sluiten: als allerlaatste (na de opslag van het spel) nog snel versturen wat veranderd is
  addEventListener('load', () => addEventListener('pagehide', () => {
    const K = leesK(); if (!K || !K.code || K.v !== 2) return;
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
    const ham = e.target.closest && e.target.closest('.gs-hamer, .tg-rommel[aria-label="Geef de dobbelsteen een zetje"]'); // vroeger de hamer, nu het rommeltje dobbelsteen
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
  const ONDERSCHRIFT = { 'rommelgroepjes.html': 'Zestien woorden, vier groepjes', 'reclame.html': 'Zes reclamespelletjes, maar dan echt', 'huisopstelten.html': 'Twee katten en een lijstje streken', 'rubendeduiker.html': 'Overdag duiken, \'s avonds koken', 'rommelhotel-online.html': 'Live met je vrienden', 'rommelhotel.html': 'Een pixelhotel om in rond te lopen', 'rommelblok.html': 'Bouw je eigen blokkenwereld', 'rommelland.html': 'Bouw je eigen 3D-pretpark', 'rommelarend.html': 'Vlieg als arend over Parijs', 'rommelbeesten.html': 'Pakjes, kaarten en gevechten', 'vlaaienbakker.html': 'Bak een Limburgs vlaaienrijk', 'rommelpoker.html': 'Poker op de rommelmarkt', 'vouwvlieger.html': 'Vouw, gooi en vlieg zo ver je kunt', 'rommelritme.html': 'Spring op de maat van de muziek', 'rob.html': 'Geef Rob een duimpje', 'productiefiets.html': 'Fiets over het Bata-terrein', 'rommelwheels.html': 'Slappe poppetjes, rare karretjes', 'steigerstress.html': 'Laad de steiger in voor Jan', 'rommelwoord.html': 'Raad het woord van de dag', 'rommelkroon.html': 'Eén kroon per rij, kolom en kleur', 'rommelbel.html': 'Schiet bellen van dezelfde kleur', 'rommelsteek.html': 'Rustig borduren, steek voor steek', 'scorebord.html': 'Wie staat er bovenaan?', 'ideeenbox.html': 'Stuur je idee in', 'mengelmoes.html': 'Combineer alles tot iets nieuws', 'opgevoel.html': 'Hoe goed is je gevoel?', 'rommelrecht.html': 'Rustig opruimen, alles op zijn plek' };
  const LOS = /\s+(een|de|het|en|van|met|door|over|op|in|aan|naar|je|om|te|voor|bij|uit|als|of|tot)$/i;
  const kort = s => { s = String(s || '').trim().replace(/\s+/g, ' '); if (s.length <= 40) return s.replace(/[.!]$/, ''); let z = s.split(/[.!?:;]/)[0].trim(); if (z.length > 40) { const k = z.indexOf(','); z = k >= 14 && k <= 40 ? z.slice(0, k) : z.slice(0, 41).replace(/\s+\S*$/, ''); } while (LOS.test(z)) z = z.replace(LOS, ''); return z; };
  const KLEUREN = ['#FFD9C7', '#CDE7D8', '#D5E3F7', '#FBE3A1', '#E9D7F2', '#FFD3DF', '#CFEDEE', '#F4DCC2', '#DDE8C4', '#F8CFC4', '#E2DDF7'];
  const VORMEN = ['tg-v1', 'tg-v2', 'tg-v3', 'tg-v4'];

  // ================= de rommeltjes (in plaats van het gereedschap)
  const ROMMEL = {
    dobbelsteen: ['de dobbelsteen', '<rect x="10" y="10" width="44" height="44" rx="9" fill="#FFFFFF" stroke="#231A26" stroke-width="3.5"/><circle cx="22" cy="22" r="4.2" fill="#231A26"/><circle cx="42" cy="42" r="4.2" fill="#231A26"/><circle cx="32" cy="32" r="4.2" fill="#C8323C"/><circle cx="42" cy="22" r="4.2" fill="#231A26"/><circle cx="22" cy="42" r="4.2" fill="#231A26"/>'],
    knoop: ['de knoop', '<circle cx="32" cy="32" r="22" fill="#2F6FB5" stroke="#231A26" stroke-width="3.5"/><circle cx="32" cy="32" r="15" fill="none" stroke="#1F4F85" stroke-width="2.5"/><circle cx="26" cy="26" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><circle cx="38" cy="26" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><circle cx="26" cy="38" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><circle cx="38" cy="38" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/>'],
    potlood: ['het potlood', '<g transform="rotate(-40 32 32)"><rect x="12" y="25" width="34" height="14" fill="#F2C94C" stroke="#231A26" stroke-width="3"/><path d="M46 25l12 7-12 7z" fill="#F4DCC2" stroke="#231A26" stroke-width="3" stroke-linejoin="round"/><path d="M54 29.7l4 2.3-4 2.3z" fill="#231A26"/><rect x="6" y="25" width="7" height="14" rx="2" fill="#E8577A" stroke="#231A26" stroke-width="3"/></g>'],
    paperclip: ['de paperclip', '<path d="M24 50V18a8 8 0 0 1 16 0v30a12 12 0 0 1-24 0V22" fill="none" stroke="#231A26" stroke-width="7" stroke-linecap="round"/><path d="M24 50V18a8 8 0 0 1 16 0v30a12 12 0 0 1-24 0V22" fill="none" stroke="#B8C0C8" stroke-width="3.4" stroke-linecap="round"/>'],
    kroonkurk: ['de kroonkurk', '<path d="M32 9l5 4 6-2 3 5 6 1 0 6 5 4-3 5 3 5-5 4 0 6-6 1-3 5-6-2-5 4-5-4-6 2-3-5-6-1 0-6-5-4 3-5-3-5 5-4 0-6 6-1 3-5 6 2z" fill="#C8323C" stroke="#231A26" stroke-width="3" stroke-linejoin="round"/><circle cx="32" cy="32" r="13" fill="#E8414E" stroke="#231A26" stroke-width="2.5"/><path d="M26 30c2-3 8-3 12 0" fill="none" stroke="#FBF6E9" stroke-width="2.5" stroke-linecap="round"/>'],
    sterretje: ['het sterretje', '<path d="M32 7l7.4 15 16.6 2.4-12 11.7 2.8 16.5L32 44.8 17.2 52.6 20 36.1 8 24.4l16.6-2.4z" fill="#FFE76A" stroke="#231A26" stroke-width="3.5" stroke-linejoin="round"/>'],
    tol: ['de tol', '<path d="M32 8v8" stroke="#231A26" stroke-width="4" stroke-linecap="round"/><path d="M12 30c0-9 9-14 20-14s20 5 20 14c0 4-2 7-6 10L32 56 18 40c-4-3-6-6-6-10z" fill="#2E8B62" stroke="#231A26" stroke-width="3.5" stroke-linejoin="round"/><path d="M13 30h38" stroke="#FFE76A" stroke-width="4"/>'],
    knikker: ['de knikker', '<circle cx="32" cy="32" r="20" fill="#7FB3E6" stroke="#231A26" stroke-width="3.5"/><path d="M18 36c6-10 18-12 28-4" fill="none" stroke="#C8323C" stroke-width="4" stroke-linecap="round"/><circle cx="25" cy="24" r="4.5" fill="#FFFFFF" opacity=".85"/>'],
  };
  const ZIJKANT = ['dobbelsteen', 'sterretje', 'potlood', 'paperclip', 'knoop', 'tol', 'kroonkurk', 'knikker'];
  const BIJ_HET_BRIEFJE = ['knikker', 'dobbelsteen', 'potlood'];

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
.tg-tegel:hover .tg-vlak, .tg-tegel:focus-visible .tg-vlak { transform: translateY(-6px) rotate(-1.5deg); box-shadow: var(--tg-zweef); }
.tg-tegel:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 6px; border-radius: 1.5rem; }
.tg-nieuw { position: absolute; top: 10px; right: 10px; background: #C8323C; color: #FFFFFF; font-weight: 800; font-size: .75rem; padding: 4px 9px; border-radius: 999px; transform: rotate(6deg); }
.tg-naam { font-weight: 800; font-size: 1.1rem; line-height: 1.15; }
.tg-zin { font-size: .875rem; line-height: 1.35; color: var(--tg-zacht); margin-top: -.25rem; }
.tg-voortgang { display: flex; flex-direction: column; gap: .25rem; font-size: .78rem; font-weight: 700; color: var(--tg-zacht); }
.tg-voortgang i { display: block; height: .35rem; border-radius: 999px; background: rgba(127,115,100,.25); overflow: hidden; } .tg-voortgang em { display: block; height: 100%; background: #C8323C; border-radius: 999px; }
.tg-rommel { position: absolute; z-index: 5; width: 66px; height: 66px; padding: 7px; border: 0; background: none; cursor: grab; touch-action: none; }
.tg-rommel svg { width: 100%; height: 100%; display: block; transform-origin: 50% 60%; pointer-events: none; }
html[data-thema="donker"] .tg-rommel svg { filter: drop-shadow(0 2px 0 rgba(0,0,0,.5)); }
.tg-rommel.sleept { cursor: grabbing; z-index: 30; } .tg-rommel.sleept svg { transform: scale(1.12) rotate(-8deg); }
.tg-rommel:focus-visible { outline: 3px solid var(--tg-focus); outline-offset: 2px; border-radius: 12px; }
.tg-rommel.hup svg { animation: tg-hup .7s cubic-bezier(.3,1.6,.5,1); }
@keyframes tg-hup { 0% { transform: translateY(0) rotate(0); } 35% { transform: translateY(-22px) rotate(-160deg); } 70% { transform: translateY(0) rotate(-340deg) scale(1.08,.9); } 100% { transform: translateY(0) rotate(-360deg); } }
@media (max-width: 700px) {
  .tg-balk { flex-direction: column; gap: .8rem; } .tg-weergave { order: -1; align-self: flex-end; } .tg-weergave button { padding: 0 12px; } .tg-weergave .tg-woord { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .tg-filters { flex-wrap: nowrap; overflow-x: auto; padding-bottom: .3rem; scrollbar-width: none; } .tg-filters::-webkit-scrollbar { display: none; }
  .tg-raster { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.6rem 1rem; } .tg-vlak { border-radius: 1.25rem; } .tg-naam { font-size: 1rem; }
}
@media (prefers-reduced-motion: reduce) { .tg-vlak, body.v6-body { transition: none; } .tg-rommel.hup svg { animation: none; } .tg-tegel:hover .tg-vlak { transform: none; } }
`;

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

  // ================= de rommeltjes neerleggen, laten springen en verslepen
  const rommeltjes = [];
  function maakRommeltje(soort, i) {
    const [naam, svg] = ROMMEL[soort];
    const b = document.createElement('button'); b.type = 'button'; b.className = 'tg-rommel'; b.setAttribute('aria-label', 'Geef ' + naam + ' een zetje');
    b.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true">' + svg + '</svg>';
    const r = { el: b, versleept: false, draai: ((i * 37) % 40) - 20 }; b.style.transform = 'rotate(' + r.draai + 'deg)';
    const hup = () => { if (minder) return; b.classList.remove('hup'); void b.offsetWidth; b.classList.add('hup'); };
    b.addEventListener('animationend', () => b.classList.remove('hup'));
    let start = null;
    b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && !start) hup(); });
    b.addEventListener('pointerdown', e => { start = { x: e.clientX, y: e.clientY, l: parseFloat(b.style.left), t: parseFloat(b.style.top), weg: false, id: e.pointerId }; try { b.setPointerCapture(e.pointerId); } catch (x) {} });
    b.addEventListener('pointermove', e => {
      if (!start || e.pointerId !== start.id) return; const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!start.weg && Math.hypot(dx, dy) < 6) return; start.weg = true; b.classList.add('sleept');
      const max = document.documentElement.scrollWidth - b.offsetWidth;
      b.style.left = Math.max(0, Math.min(max, start.l + dx)) + 'px'; b.style.top = Math.max(0, start.t + dy) + 'px';
    });
    const klaar = e => { if (!start || (e && e.pointerId !== start.id)) return; const weg = start.weg; start = null; b.classList.remove('sleept'); if (weg) r.versleept = true; else hup(); };
    b.addEventListener('pointerup', klaar); b.addEventListener('pointercancel', klaar);
    b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hup(); } });
    b.addEventListener('click', e => e.preventDefault());
    document.body.appendChild(b); rommeltjes.push(r); return r;
  }
  function plaats() {
    const main = $('main'), held = $('.held'), coul = $('.coulissen'), brief = $('.briefje'); if (!main || !held) return;
    const vw = document.documentElement.clientWidth, sx = scrollX, sy = scrollY, mr = main.getBoundingClientRect(), hr = held.getBoundingClientRect();
    const links = mr.left - 84, rechts = mr.right + 18, ruimte = links >= 6 && rechts + 66 <= vw - 6;
    const boven = hr.bottom + sy + 60, onder = coul ? coul.getBoundingClientRect().top + sy - 40 : boven + 1800;
    let z = 0, k = 0;
    for (const r of rommeltjes) {
      if (r.versleept) continue;
      if (r.plek === 'brief') {
        const br = brief ? brief.getBoundingClientRect() : hr, kop = document.querySelector('#tg-kop span'), kr = kop ? kop.getBoundingClientRect() : br;
        if (vw < 700) { r.el.style.left = Math.max(kr.right + sx + 12, mr.right + sx - 70 - k * 62) + 'px'; r.el.style.top = (kr.top + sy - 18) + 'px'; r.el.hidden = k > 1 || mr.right - 70 - k * 62 < kr.right + 12; }
        else { r.el.style.left = Math.min(br.right + sx + 40 + k * 78, mr.right + sx - 70) + 'px'; r.el.style.top = (br.top + sy + 10 + (k % 2) * 46) + 'px'; r.el.hidden = false; }
        k++;
      } else {
        r.el.hidden = !ruimte; if (!ruimte) continue;
        const stap = (onder - boven) / Math.max(1, Math.ceil(ZIJKANT.length / 2));
        r.el.style.left = ((z % 2 ? rechts : links) + sx + ((z * 13) % 20) - 10) + 'px'; r.el.style.top = (boven + Math.floor(z / 2) * stap + (z % 2) * stap * 0.45) + 'px'; z++;
      }
    }
  }
  function zetRommeltjes() {
    BIJ_HET_BRIEFJE.forEach((s, i) => { const r = maakRommeltje(s, i); r.plek = 'brief'; });
    ZIJKANT.forEach((s, i) => { const r = maakRommeltje(s, i + 3); r.plek = 'zij'; });
    plaats(); let t = 0; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(plaats, 150); }); addEventListener('load', plaats); setTimeout(plaats, 900);
  }

  // ================= starten, en daarna de homepage zacht laten verschijnen
  const klaar = () => requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('hp-klaar')));
  const begin = () => { try { bouw(); } finally { klaar(); } };
  if ($('.v8')) begin();
  else { const w = new MutationObserver(() => { if ($('.v8')) { w.disconnect(); begin(); } }); w.observe(document.documentElement, { childList: true, subtree: true }); setTimeout(() => { w.disconnect(); klaar(); }, 2500); }
})();
