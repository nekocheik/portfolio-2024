<template>
  <div class="text-white mx-4">
    <svg class="absolute">
      <filter id="wavyGenerique">
        <feTurbulence id="turbulence2" type="turbulence" numOctaves="10" result="NOISE1"></feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="NOISE1" scale="100"></feDisplacementMap>
        <animate xlink:href="#turbulence2" attributeName="baseFrequency" dur="50s" keyTimes="0;0.2;1"
          values="0.01 0.02;0.02 0.01;0.04 0.02" repeatCount="indefinite"></animate>
      </filter>
    </svg>
    <section style="filter: url(#filter)" class="lg:pl-20">
      <section>
        <div class="max-w-[500px] lg:max-w-[1300px] 2xl:max-w-[1500px] 2xl:pb-80">
          <h1 class="pt-28 text-4xl font-kiona lg:pt-40 lg:text-[50px] py-8">Qui je suis ?</h1>
          <p class="pt-2 text-4xl font-kiona text-primary-light lg:text-[80px] font-bold py-10 xl:top-16">
            Hello !!
          </p>
          <section class="lg:text-base leading-8">
            <div class="relative flex items-center">
              <p class="pt-4 lg:pt-20 lg:pr-20">
                Je suis un développeur <span class="text-tertiary">multi-casquette</span>, <span
                  class="text-primary">développeur <span class="text-primary-ligh text-bold">Vue.js</span> depuis 5
                  ans</span> et
                ayant une bonne connaissance en React.<br /> Mon expertise s'étend également au <span
                  class="text-tertiary">back-end</span>
                et au <span class="text-primary">design</span>, ce qui me permet de <span class="text-tertiary">gérer
                  des projets</span> de bout en bout. En tant que
                <span class="text-primary-ligh font-bold">Tech Lead</span>, j'ai <span class="text-tertiary">guidé une
                  équipes</span> et assuré une communication fluide et efficace.
                <span class="text-primary">Curieux de nature</span>, je suis constamment à la recherche de nouvelles
                technologies et
                méthodes pour améliorer mes compétences. <span class="text-tertiary">J'utilise régulièrement
                  Figma</span> pour
                collaborer avec les designers et garantir une cohérence visuelle parfaite, Ou moi même designer mes
                propre interfaces.
                J'ai également une <span class="text-primary">bonne connaissance des outils de DevOps</span> comme <span
                  class="text-primary">Docker</span> et <span class="text-primary">Kubernetes</span>, ce qui me
                permet de gérer efficacement le déploiement et la gestion des applications. Au cours
                de ma carrière, j'ai travaillé sur une variété de projets et pour différents types
                d'entreprises, ce qui m'a permis de développer une <span class="text-primary">polyvalence</span> et une <span class="text-tertiary">adaptabilité</span>
                précieuses.
              </p>
              <div class="h-[300px] relative hidden lg:block -top-24">
                <div :duration="1200" v-motion-fade style="filter: url(#wavyGenerique)"
                  class="w-[380px] h-[380px] 2xl:w-[500px] 2xl:h-[500px] bg-primary-medium absolute rounded-full top-[-30px] left-[-30px]">
                </div>
                <div :duration="1200" v-motion-fade style="filter: url(#wavyGenerique)"
                  class="w-[380px] h-[380px] 2xl:w-[500px] 2xl:h-[500px] bg-tertiary absolute rounded-full top-[30px] left-[30px]">
                </div>
                <img :enter="{ x: 900 }" :duration="1200" :delay="1000" v-motion-slide-visible-right
                  class="min-w-[380px] 2xl:min-w-[500px] z-20" src="/photo-cheik-kone.png" alt="" />
              </div>
            </div>
          </section>
        </div>
      </section>

      <div class="lg:flex">
        <section>
          <p class="pt-8 text-4xl font-kiona font-semibold text-primary">SKILLs</p>
          <div class="list-disc lg:pl-6">
            <div class="pt-10 text-2xl">
              <ul class="list-disc">
                <li class="uppercase font-bold">Design</li>
              </ul>
              <ul class="list-disc pl-8 pt-3">
                <div class="pl-4">
                  <li class="text-base">UX/UI</li>
                  <p class="max-w-[400px] text-base lg:pb-10">
                    Utilisation régulière des outils de design, avec une maîtrise de niveau
                    intermédiaire de Figma. Mes connaissances des règles de base en UX/UI me
                    permettent de communiquer efficacement avec les designers et même de réaliser
                    moi-même des designs complets lorsque c'est nécessaire.
                  </p>
                </div>
              </ul>
            </div>
            <div class="pt-10 text-2xl lg:pb-24">
              <ul class="list-disc">
                <li class="uppercase font-bold">Developpement</li>
              </ul>
              <ul class="list-disc pl-10 max-w-[600px] 2xl:max-w-[900px]">
                <li class="uppercase py-3 text-xl">Front-end</li>
                <div class="text-base">
                  <p class="pb-1">
                    Je suis passionné par Vue.js, que j'utilise depuis mes débuts en tant que développeur. J'apprécie
                    particulièrement son approche user-friendly, qui permet de créer des solutions accessibles, même
                    pour des développeurs juniors. J'ai également une solide maîtrise de JavaScript et TypeScript.
                  </p>
                  <br>
                  <p class="pb-1">
                    J'ai une bonne connaissance des frameworks SSR comme Next.js et Nest.js, que j'utilise avec React
                    et Vue.js. Je mets un point d'honneur à respecter les bonnes pratiques en matière
                    d'accessibilité et de sémantique HTML.
                  </p>
                  <br>
                  <p class="pb-1">
                    J'optimise les animations CSS et JavaScript
                    pour garantir une expérience utilisateur fluide et sans bug.
                    Pour documenter et tester les composants de manière isolée, j'utilise Storybook. En matière de
                    tests,
                    je maîtrise les tests unitaires et end-to-end avec Jest et Cypress, assurant ainsi
                    la robustesse et la qualité de mes projets.
                  </p>
                  <br>
                </div>
                <div class="flex text-base py-6">
                  <p class="pr-4">Vue</p>
                  <p class="pr-4">Nuxt</p>
                  <p class="pr-4">React</p>
                  <p class="pr-4">Next</p>
                  <p class="pr-4">Cypress</p>
                  <p class="pr-4">Jest</p>
                  <p>Next.js</p>
                </div>
                <li class="uppercase py-3 text-xl">back-end</li>
                <div class="text-base">
                  <p>
                    Je suis à l'aise avec <span class="text-primary">Node.js</span> et <span class="text-primary">Express.js</span> pour le développement de serveurs
                    robustes et performants. <br />J'ai une bonne connaissance des bases de données,
                    notamment <span class="text-primary">MongoDB</span>, <span class="text-primary">SQL</span> et <span class="text-primary">MySQL</span>, ce qui me permet de gérer efficacement les
                    données dans divers projets.
                  </p>
                  <br />
                  <p class="pb-1">
                    Je suis également familier avec les architectures <span class="text-primary">serverless</span>, ce qui me permet
                    de créer des applications scalables et flexibles.<br />
                    J'utilise des outils comme <span class="text-primary">Notion</span> pour la gestion de projets et <span class="text-primary">Make</span> pour
                    l'automatisation des tâches.
                  </p>
                  <br />
                  <p class="pb-1">
                    Pour la gestion de contenu, j'ai de l'expérience avec <span class="text-primary">Strapi</span>, un CMS headless
                    qui s'intègre parfaitement avec les applications modernes.
                    <p /><br />
                  </p>

                  <p class="pb-1">
                    En matière d'hébergement et de services cloud, j'utilise <span class="text-primary">Google Cloud Platform
                    (GCP)</span> pour le hosting et l'utilisation des services GCP, ce qui me permet de
                    déployer et de gérer des applications de manière efficace et sécurisée.
                  </p>
                </div>
              </ul>
            </div>
          </div>
        </section>
        <div class="list-disc lg:left-[-200px]">
          <p class="pt-8 text-4xl font-kiona font-semibold text-tertiary">Hobies</p>
          <div class="pt-10 text-xl pl-6">
            <ul class="list-disc lg:leading-[46px]">
              <li>Développement</li>
              <li>Jeux vidéo</li>
              <li>Art Peinture</li>
              <li>dessin</li>
              <li>Manga</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-primary text-4xl uppercase font-thin lg:pt-40 2xl:pt-8">
            Ou me suivre ?
          </h2>
          <section class="flex items-end justify-center pt-5">
            <div class="pr-20" v-mouse role="a" @click="openLink('https://github.com/nekocheik')">
              <img src="/github-logo.svg" alt="" />
              <p class="pt-4">Github</p>
            </div>
            <div class="" role="a" v-mouse @click="openLink('https://www.linkedin.com/in/cheik-kone')">
              <img src="/linkedin-logo.svg" alt="" />
              <p class="pt-4">Linkedin</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scope>
.dot {
  display: block;
  width: 4px;
  height: 4px;
  background: red;
}
</style>

<script setup lang="ts">
const openLink = (url: string) => {
  window.open(url)
}
</script>
