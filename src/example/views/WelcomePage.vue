<template>
  <MainLayout>
    <div>
      <TitleElement id="textarea" tag="h1">
        Vue 3 Tailwind (base)Components
      </TitleElement>
      <ParagraphElement>
        Welcome to our <b>Vue 3</b> UI library! Our library provides a collection of
        reusable and customizable components built with <b>Tailwind CSS</b>. Our mission
        is to make it easy for you to create beautiful, functional interfaces without
        having to write the same components over and over again. With our library, you can
        focus on bringing your unique design vision to life, while we take care of the
        underlying functionality.
      </ParagraphElement>
      <ParagraphElement>
        Our library is highly customizable. Components have predefined layouts but can be
        personalized with simple CSS modifications. Tailor your application to your
        specific needs and preferences, making it unique.
      </ParagraphElement>
      <ParagraphElement> To get started: </ParagraphElement>
      <ParagraphElement>
        <BaseCode code="npm i vue-tailwind-basecomponents" language="bash" />
      </ParagraphElement>
      <ParagraphElement>
        <BaseCode code="import { ... } from 'vue-tailwind-basecomponents'" />
      </ParagraphElement>
      <ParagraphElement>
        We use the <b>BEM</b> naming convention for our elements, which makes it easy to
        add your own custom Tailwind classes to our components. All of our elements have a
        class name that follows the BEM naming style, so you simply need to add your
        custom classes to these elements. You can do this in your main CSS file, unscoped
        in any component, or in scoped styles using the
        <b>:deep(.class-name)</b>:deep(.class-name) css directive.
      </ParagraphElement>
    </div>
  </MainLayout>
</template>
