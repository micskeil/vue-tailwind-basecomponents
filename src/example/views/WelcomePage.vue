<template>
  <MainLayout>
    <div>
      <img
        src="/assets/logo.png"
        alt="Vue 3 Tailwind (base)Components"
        width="250"
        class="mx-auto -translate-x-1/2"
      >
      <TitleElement
        id="textarea"
        tag="h1"
      >
        Vue 3 Tailwind (base)Components
      </TitleElement>
      <ParagraphElement>
        Streamline your <b>Vue 3 Tailwind projects</b> with our powerful collection of basic elements. Our easy-to-use
        components come with predefined CSS layouts, so you can create beautiful web applications effortlessly.
      </ParagraphElement>
      <ParagraphElement>
        Our library is highly customizable. Components have predefined layouts but can be personalized with simple CSS
        modifications. Tailor your application to your specific needs and preferences, making it unique.
      </ParagraphElement>
      <ParagraphElement> To get started: </ParagraphElement>
      <ParagraphElement>
        <BaseCode
          code="npm i vue-tailwind-basecomponents"
          language="bash"
        />
      </ParagraphElement>
      <ParagraphElement>
        It's generally best to import directly from packages when using components, composables, and directives. This
        ensures use of the latest code version, reduces potential conflicts with other libraries, keeps code clean, and
        makes it easier to read.
      </ParagraphElement>
      <ParagraphElement>
        <BaseCode code="import { ... } from 'vue-tailwind-basecomponents'" />
      </ParagraphElement>
    </div>
  </MainLayout>
</template>
