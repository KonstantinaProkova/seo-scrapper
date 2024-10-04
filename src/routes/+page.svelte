<script lang="ts">
  import Card from "$lib/components/Card.svelte";

  export let form;
  const checked = Object.values(form?.data ?? {});

  const total = checked.length;
  let correct = 0;

  for (const value of checked) {
    if (value.success) {
      correct++;
    }
  }
  const score = (correct / total) * 100;
</script>

<div class="max-w-[600px] m-auto">
  <h1 class="m-2 text-slate-300 text-2xl font-bold text-center">
    Please insert your URL!
  </h1>
  <form method="post">
    <div class="flex gap-4 mb-4 items-center justify-center">
      <input
        class="placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md p-2 w-full sm:text-sm"
        placeholder="Insert your url..."
        type="text"
        name="url"
      />
      <button
        class="bg-sky-500 rounded-md px-4 py-2 text-slate-200 text-sm hover:bg-sky-700"
        >Search</button
      >
    </div>
  </form>
  {#if form?.success}
    <div class="text-slate-300 text-xl font-semibold flex flex-col gap-3">
      <Card
        title="Is it indexed?"
        error={form.data.robots.error}
        success={form.data.robots.success}
      >
        {form.data.robots.content}
      </Card>
      <Card
        title="Canonical URL"
        error={form.data.canonicalUrl.error}
        success={form.data.canonicalUrl.success}
      >
        <a href={form.data.canonicalUrl.content} target="_blank">
          {form.data.canonicalUrl.content}
        </a>
      </Card>
      <Card
        title="Meta Title"
        error={form.data.metaTitle.error}
        success={form.data.metaTitle.success}
      >
        {form.data.metaTitle.content}
        {#if !form.data.metaTitleLength.success}
          <p class="text-red-300 text-sm pt-1">
            {form.data.metaTitleLength.error}
          </p>
        {/if}
      </Card>
      <Card
        title="Meta Description"
        error={form.data.metaDescription.error}
        success={form.data.metaDescription.success}
      >
        {form.data.metaDescription.content}
        {#if !form.data.metaDescriptionLength.success}
          <p class="text-red-300 text-sm pt-1">
            {form.data.metaDescriptionLength.error}
          </p>
        {/if}
      </Card>
      <Card
        title="H1 Tag"
        error={form.data.mainHeading.error}
        success={form.data.mainHeading.success}
      >
        {form.data.mainHeading.content}
      </Card>
    </div>
    <div class="bg-sky-700 border border-sky-500 mt-6 rounded-md p-2;">
      <p class="text-slate-300 text-center text xl font-bold m-2">
        Your current SEO Score is
        <span class="text-green-300">{score.toFixed(0)}%</span>
      </p>
    </div>
  {/if}
  {#if form?.error}
    <p class="text-red-400 font-bold">{form.error}</p>
  {/if}
</div>
