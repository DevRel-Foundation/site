export async function load({ fetch }: { fetch: typeof globalThis.fetch }) {
    const [res, toolsRes] = await Promise.all([
      fetch('/api/tools-catalog'),
      fetch('/api/tools-catalog/tools')
    ]);

  try {

    if (!res.ok) {
      console.error('/api/tools-catalog returned non-OK', { status: res.status });
    }

    if (!toolsRes.ok) {
      console.error('/api/tools-catalog/tools returned non-OK', { status: toolsRes.status });
    }

    const data = await res.json().catch(() => ({}));
    const toolsData = await toolsRes.json().catch(() => ({}));



    const count = data.count;
    let tools: any = toolsData.tools || {};

    const labels = data.labels.map((l: any) => ({
      label: l ?? String(l),
      value: l ?? String(l)
    }));

    const categories = data.categories.map((c: any) => ({
      label: c ?? String(c),
      value: c ?? String(c),
    }));

    const outcomes = data.outcomes.map((o: any) => ({
      label: o ?? String(o),
      value: o ?? String(o)
    }));

    const motivations = data.motivations.map((m: any) => ({
      label: m ?? String(m),
      value: m ?? String(m)
    }));

    const situations = data.situations.map((s: any) => ({
      label: s ?? String(s),
      value: s ?? String(s)
    }));

    return {
      labels: labels,
      categories: categories,
      outcomes: outcomes,
      motivations: motivations,
      situations: situations, 
      count: count,
      tools: tools
    };


  } catch (err) {
    console.error('Error in tools-catalog page load', err);
    return { categories: [], labels: [], tools: [], count: 0 };
  }

}

