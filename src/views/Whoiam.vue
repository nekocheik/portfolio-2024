<template>
  <div class="text-white mx-4">
    <section class="lg:pl-40">
      <section>
        <div class="max-w-[500px] lg:max-w-[1300px] 2xl:max-w-[1500px] 2xl:pb-80">
          <h1 class="pt-28 text-4xl font-kiona lg:pt-40 lg:text-[50px] py-8">Qui je suis ?</h1>
          <p class="pt-2 text-4xl font-kiona text-tertiary lg:text-[80px] font-bold py-10">
            Hello !!
          </p>
          <section class="lg:text-xl">
            <div class="relative flex items-center">
              <p class="pt-4 lg:pr-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod id lectus amet,
                pretium vulputate. Lobortis vitae nisl, augue ullamcorper venenatis imperdiet
                faucibus id sapien. Eu quis leo, lectus placerat pulvinar. Suspendisse in ut lectus
                amet suspendisse id quis vel. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Euismod id lectus amet, pretium vulputate. Lobortis vitae nisl, augue
                ullamcorper venenatis imperdiet faucibus id sapien. Eu quis leo, lectus placerat
              </p>
              <div class="h-[300px] relative hidden lg:block">
                <div
                  class="w-[400px] h-[400px] bg-primary absolute rounded-full top-[-30px] left-[-30px]"
                ></div>
                <div
                  class="w-[400px] h-[400px] bg-tertiary absolute rounded-full top-[30px] left-[30px]"
                ></div>
                <img class="min-w-[400px] z-20" src="/photo-cheik-kone.png" alt="" />
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
                  <li class="text-base">UX</li>
                  <p class="max-w-[300px] text-base">
                    augue ullamcorper venenatis imperdiet faucibus id sapien. Eu quis leo, lectus
                    placerat pulvinar. Suspendisse in ut lectus amet suspendisse id quis vel.augue
                    ullamcorper venenatis imperdiet faucibus id sapien. Eu quis leo, lectus
                    placerat.
                  </p>
                </div>
                <div class="pl-4">
                  <li class="text-base">UI</li>
                  <p class="max-w-[600px] text-base">
                    augue ullamcorper venenatis imperdiet faucibus id sapien. Eu quis leo, lectus
                    placerat pulvinar. Suspendisse in ut lectus amet suspendisse id quis vel.augue
                    ullamcorper venenatis imperdiet faucibus id sapien. Eu quis leo, lectus
                    placerat.
                  </p>
                </div>
              </ul>
            </div>
            <div class="pt-10 text-2xl lg:pb-24">
              <ul class="list-disc">
                <li class="uppercase font-bold">Developpement</li>
              </ul>
              <ul class="list-disc pl-8">
                <li class="pl-4">Front-end</li>
                <li class="pl-4">back-end</li>
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
              <li>3D</li>
            </ul>
          </div>
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
