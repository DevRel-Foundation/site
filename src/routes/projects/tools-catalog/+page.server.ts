export async function load({ fetch }) {
  try {
    const [catRes, labelRes] = await Promise.all([
      fetch('/api/tools-catalog/jobs/categories'),
      fetch('/api/tools-catalog/labels')
    ]);

    if (!catRes.ok || !labelRes.ok) {
      // log text bodies for easier debugging in dev
      const catText = await catRes.text().catch(() => '<no-body>');
      const labelText = await labelRes.text().catch(() => '<no-body>');
      console.error('tools-catalog endpoints returned non-OK', { catRes: catRes.status, labelRes: labelRes.status, catText, labelText });
      return { categories: [], labels: [] };
    }

    const categoriesData = await catRes.json().catch(() => ({}));
    const labelsData = await labelRes.json().catch(() => ({}));

    const categoriesArray = Array.isArray(categoriesData?.categories) ? categoriesData.categories : [];
    const labelsArray = Array.isArray(labelsData?.labels) ? labelsData.labels : [];

    const mappedCategories = categoriesArray.map((c: any) => ({
      // prefer a human-friendly label, fall back to value or the whole object
      label: c.description ?? c.value ?? String(c),
      value: c.value ?? c.const ?? c.description ?? String(c)
    }));

    const mappedLabels = labelsArray.map((l: any) => ({
      label: l.label ?? String(l),
      value: l.label ?? String(l)
    }));

    console.log('mappedCategories', mappedCategories);

    return {
      categories: mappedCategories,
      labels: mappedLabels
    };
  } catch (err) {
    console.error('Error in tools-catalog page load', err);
    return { categories: [], labels: [] };
  }
}