// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function ShieldIllustration({ ...other }) {
    const theme = useTheme();
    const PRIMARY_LIGHTER = theme.palette.primary.lighter;
    const PRIMARY_MAIN = theme.palette.primary.main;
    const PRIMARY_DARK = theme.palette.primary.dark;
    const PRIMARY_DARKER = theme.palette.primary.darker;

    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-350 -350 1750 1750">
                <g transform="translate(0.000000,986.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M4278 9850 c-82 -6 -110 -13 -171 -42 -114 -55 -160 -112 -193 -240
                        -13 -49 -17 -135 -21 -380 l-5 -317 -27 -5 c-14 -3 -46 -8 -71 -11 -184 -26
                        -596 -173 -873 -312 -70 -34 -299 -161 -399 -220 -5 -2 -104 90 -221 204 -255
                        249 -293 277 -405 301 -77 16 -86 16 -147 0 -106 -28 -173 -80 -442 -342 -225
                        -218 -283 -310 -283 -446 0 -140 48 -217 304 -480 108 -110 196 -209 196 -219
                        0 -9 -36 -78 -81 -152 -211 -350 -379 -776 -473 -1201 l-6 -28 -313 0 c-337 0
                        -389 -6 -464 -53 -56 -36 -121 -111 -151 -175 l-27 -57 -3 -319 c-4 -324 5
                        -472 32 -537 21 -50 49 -82 131 -149 l73 -60 165 0 c90 0 252 -3 360 -7 l195
                        -6 7 -36 c63 -356 259 -854 483 -1226 l79 -130 -167 -171 c-196 -201 -297
                        -317 -316 -361 -21 -49 -28 -169 -14 -236 9 -45 23 -72 62 -120 86 -106 520
                        -533 563 -554 50 -25 101 -35 180 -34 130 1 205 50 466 308 107 106 198 193
                        201 193 4 0 50 -30 105 -66 54 -36 182 -108 284 -159 292 -145 535 -235 835
                        -309 l152 -38 6 -176 c10 -294 24 -484 41 -539 19 -64 93 -148 162 -185 70
                        -38 141 -48 393 -54 245 -7 454 6 538 31 68 21 171 114 200 183 27 62 41 203
                        50 502 l7 235 70 18 c269 68 599 176 727 237 l48 22 -22 32 c-12 17 -204 214
                        -425 437 l-404 406 -110 -23 c-314 -65 -844 -69 -1118 -8 -457 101 -890 333
                        -1230 659 -360 346 -592 736 -716 1206 -50 190 -65 305 -72 544 -9 323 14 542
                        82 781 139 488 412 910 810 1253 401 346 814 531 1330 596 172 22 498 22 660
                        0 473 -63 906 -250 1280 -552 108 -87 296 -276 387 -388 165 -204 337 -519
                        421 -770 94 -282 117 -414 124 -713 8 -319 -13 -537 -74 -791 l-25 -105 398
                        -396 c220 -217 412 -402 428 -410 26 -14 29 -13 47 8 44 55 178 435 255 721
                        24 90 45 166 48 168 2 3 132 9 288 14 293 9 406 20 470 46 51 20 141 120 164
                        180 16 42 18 92 22 405 4 376 -3 469 -37 536 -20 38 -77 96 -146 149 l-40 31
                        -333 7 c-183 4 -347 11 -364 14 -31 6 -32 7 -79 180 -117 429 -266 779 -460
                        1084 l-70 110 179 181 c213 215 275 290 315 374 27 58 29 70 25 145 -5 107
                        -37 167 -161 307 -104 117 -356 360 -436 420 -63 48 -133 70 -218 70 -112 0
                        -170 -39 -438 -293 -88 -84 -179 -170 -203 -191 l-42 -38 -104 65 c-305 193
                        -772 384 -1136 465 l-125 28 -6 329 c-4 182 -11 347 -16 367 -32 114 -129 224
                        -224 253 -101 30 -495 43 -741 25z"/>
                    <path d="M4421 6750 c-166 -24 -299 -65 -308 -96 -5 -16 123 -159 382 -424
                        128 -131 258 -270 289 -308 77 -95 89 -132 90 -272 0 -177 -23 -224 -207 -416
                        -131 -138 -249 -239 -321 -274 -82 -40 -194 -57 -271 -42 -136 28 -179 61
                        -572 443 -250 243 -312 295 -337 286 -39 -15 -72 -263 -62 -462 13 -225 54
                        -392 141 -565 148 -295 422 -566 706 -699 218 -102 379 -133 769 -146 210 -8
                        277 -20 368 -71 182 -102 328 -241 1914 -1820 1619 -1612 1783 -1769 1938
                        -1847 63 -31 67 -32 191 -31 148 2 222 18 335 74 141 69 249 196 301 354 23
                        72 26 97 27 231 1 147 0 151 -28 205 -87 166 -235 322 -1772 1855 -1334 1331
                        -1659 1660 -1759 1785 -29 36 -75 110 -103 165 l-49 100 -7 230 c-13 444 -30
                        607 -80 751 -37 109 -129 283 -198 375 -82 110 -264 292 -358 358 -153 108
                        -374 201 -574 242 -115 23 -344 33 -445 19z m4865 -5848 c50 -26 100 -75 126
                        -127 26 -49 36 -167 18 -219 -17 -51 -83 -132 -138 -168 -46 -29 -50 -30 -138
                        -25 -111 6 -147 21 -202 81 -89 97 -110 204 -59 308 33 67 109 140 170 162 58
                        22 169 16 223 -12z"/>
                </g>
            </svg>
        </Box>
    );
}
