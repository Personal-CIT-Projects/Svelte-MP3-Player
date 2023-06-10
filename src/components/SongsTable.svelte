<script>
    import {onMount} from "svelte";
    import axios from "axios";
    import Title from "../layout/Title.svelte";

    let mounted = false
    let songs = []
    let alert = ""

    onMount(() => {
        loadData()
        mounted = true
    })

    function loadData() {
        axios.get("song/get")
            .then(response => songs = response.data)
        if (!mounted) setInterval(loadData, 5000)
    }

    function songUrl(song){
        return `${axios.defaults.baseURL}song/get/${song.id}`
    }

    function copyUrl(song) {
        navigator.clipboard.writeText(songUrl(song))
        alert = `${song.artist} - ${song.title}`
    }
</script>

{#if songs.length > 0}
    {#if alert.length > 0}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3" role="alert">
            <span class="block sm:inline">Successfully copied</span>
            <strong class="font-bold">{alert}</strong>
        </div>
    {/if}

    <table class="table-auto">
        <thead>
        <tr>
            <th class="text-left">Title</th>
            <th class="text-center">Streams</th>
            <th class="pl-5">Options</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each songs.sort((a,b) => a.streams-b.streams) as song}
            <tr>
                <td>{`${song.artist} - ${song.title}`}</td>
                <td class="text-center">{song.streams}</td>
                <td class="pl-5">
                    <a href="#" on:click={() => copyUrl(song)}>Copy</a>
                </td>
                <td class="pl-5">
                    <audio controls preload="none">
                        <source src={songUrl(song)} type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
{:else}
    <Title value="Upload your song!"/>
{/if}

<style>
    table {
        max-width: 700px;
    }
</style>
