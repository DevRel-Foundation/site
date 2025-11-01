<script lang="ts">
	import InfoPage from '$lib/components/ui/organisms/InfoPage.svelte';

	export let data;
</script>


<InfoPage title="Tools Catalog Definitions" 
  description="Definitions for job categories and outcomes used in the DevRel Foundation Tools Catalog."
  breadcrumbs={[{label:"About | Tools Catalog", link: "/projects/tools-catalog"}]}
  wide={true}
  >

    <h2>Job Categories</h2>
    <table class="styled-table">
        <thead>
            <tr>
                <th>Category</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {#each data.categories as cat}
                <tr>
                    <td><b>{cat.value}</b></td>
                    <td>{cat.description}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <h2>Job Outcomes</h2>
    <table class="styled-table">
        <thead>
            <tr>
                <th>Outcome</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {#each data.outcomes as outcome}
                <tr>
                    <td><b>{outcome.value}</b></td>
                    <td>{outcome.description}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <h2>Job Motivations</h2>
    <table class="styled-table">
        <thead>
            <tr>
                <th>Motivation</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {#each data.motivations as motivation}
                <tr>
                    <td><b>{motivation.value}</b></td>
                    <td>{motivation.description}</td>
                </tr>
            {/each}
        </tbody>
    </table>    


    <h2>Job Situations</h2>
    <table class="styled-table">
        <thead>
            <tr>
                <th>Situation</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {#each data.situations as situation}

                <tr>
                    <td><b>{situation.value}</b></td>
                    <td>{situation.description}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</InfoPage>



<style>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: var(--color-button-background);
    color: var(--color-text-dark);
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}



.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: var(--color-background-secondary-1);
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table td:first-child,
.styled-table th:first-child {
    min-width: 180px; /* or use width: 180px for fixed */
    white-space: nowrap;
}

</style>