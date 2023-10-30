<template>
  <info-layout>
    <h1>Pop-Up Ausstellungen in Essen und Gelsenkirchen & Partizipation</h1>

    <p>
      Im Juni 2023 lud ich Menschen aus Essen und Gelsenkirchen bei zwei eintägigen PopUp Ausstellungen ein. Die Beuscher:innen konnten dem Thema dieses Kunstwerkes näher kommen, ich berichtete aus meiner Recherche und zeigte einige Skizzen, die während der ersten Phase des Projektes entstanden waren.
    </p>
    <img class="infoimage" :src=image2>
    <figcaption class="infocaption">PopUp Ausstellung bei Kunstwerden e.V. in Essen, Werden</figcaption>
    <img class="infoimage" :src=image3>
    <figcaption class="infocaption">Gespräch über die Recherche</figcaption>
    <img class="infoimage" :src=image7>
    <figcaption class="infocaption">PopUp Ausstellung bei MXR Lab in Gelsenkirchen</figcaption>
    <img class="infoimage" :src=image5>
    <figcaption class="infocaption">Gespräch über die Recherche</figcaption>
    <p> 
      Ich lud die Besucher:innen ebenfalls ein, eine eigene "404 - Natur nicht gefunden" Fehlerseite zu erstellen. Ich bat sie um folgendes: 
      A) Eine kurzen Text über eine eigene Begegnung zwischen Natur und Kultur, zwischen Emschernatur und Industrie, zwischen Stadt und Fluss
      B) Ein eigenes, rechtefreies Foto, welches dieser Geschichte oder Erinnerung visuellen Ausdruck verleihen kann
      C) Eine mit pinkem und gelben Textmarker gezeichnete, (gegenständlichen oder abstrakten) Darstellung der beschriebenen Begegnung. Diese konnte auch eine Erweiterung oder Ergänzung des Fotos oder des Textes sein. 
      Es konnten alle drei Teilelemente gespendet werden, es reichte aber auch eines der Elemente. Auch Online konnten Interessierte eine Spende durch ein Formular hinterlassen. 
    </p>
    <img class="infoimage" :src=image1>
    <figcaption class="infocaption">Materialien zur Partizipation und Textrefernzen</figcaption>
    <img class="infoimage" :src=image4>
    <figcaption class="infocaption">Kathi spendet eine 404 Seite</figcaption>
    <img class="infoimage" :src=image8>
    <figcaption class="infocaption">Eine Skizze mit Textmarkern malen</figcaption>
    <img class="infoimage" :src=image6>
    <figcaption class="infocaption">Testen der digitalen Skizzen</figcaption>
    <p>
      Sogenannte künstliche Intelligenz spendete auf Geheiß des Künstlers hin, ebenfalls Zeichnungen, Bilder und kurze Geschichten.Die so angehäuften Perspektiven und deren technische Verarbeitung sowie computergestützte Weiterentwicklung ist verteilt in der hier vorliegenden digitalen Skulptur zu finden. Die Partizipation der Besucher:innen floss in das Kunstwerk ein und schafft einen Blick auf ein durch menschliches Erinnerungsvermögen und technische Speicherung sowie Weiterverarbeitung verändertes Naturverständnis. 
    </p>

  </info-layout>
</template>
<script setup lang="ts">
import {useSimplifiedSeo} from "~/utils/seo";
import image1 from "./assets/img/ausstellung_764.jpg";
import image2 from "./assets/img/ausstellung_770.jpg";
import image3 from "./assets/img/ausstellung_791.jpg";
import image4 from "./assets/img/ausstellung_854.jpg";
import image5 from "./assets/img/ausstellung_888.jpg";
import image6 from "./assets/img/ausstellung_905.jpg";
import image7 from "./assets/img/ausstellung_923.jpg";
import image8 from "./assets/img/ausstellung_953.jpg";

useSimplifiedSeo({
  title: '404 - Natur nicht gefunden / Nature not found || PopUp Ausstellungen und Partizipation' 
})
</script>