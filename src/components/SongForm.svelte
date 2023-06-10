<script>
    import Title from "../layout/Title.svelte";
    import axios from "axios";

    let artist = ""
    let title = ""
    let files = []
    let msg = {
        value: "",
        color: "red"
    }

    function handleSubmit() {
        if (artist.length < 3) {
            msg = {value: "Please fill in the artist name!", color: "red"}
            return;
        }
        if (title.length < 3) {
            msg = {value: "Please fill in the song title!", color: "red"}
            return;
        }
        if (files.length === 0) {
            msg = {value: "Please select a song!", color: "red"}
            return;
        }
        msg = {value: "Uploading...", color: "yellow"}
        let formData = new FormData();
        formData.append("file", files[0])
        axios.post(`song/add/${artist.replace(" ", "_")}/${title.replace(" ", "_")}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(() => msg = {
                value: `You can find the song in the list within a few seconds!`,
                color: "green"
            })
            .catch(response => msg = {
                value: response,
                color: "red"
            })
    }
</script>

<div id="songForm">
    <Title value={"New"}/>
    <div class="my-4"></div>
    {#if msg.value.length > 0}
        <div class="p-4 mb-4 text-sm rounded-lg bg-{msg.color}-50" role="alert">
            <span class="font-medium">Hey!</span> {msg.value}
        </div>
    {/if}
    <div class="mb-4">
        <label class="block text-sm font-medium leading-6 text-gray-900">Artist</label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <input type="text" required bind:value={artist}
                   class="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Taylor Swift">
        </div>
    </div>
    <div class="mb-4">
        <label class="block text-sm font-medium leading-6 text-gray-900">Title</label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <input type="text" required bind:value={title}
                   class="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Let it rain!">
        </div>
    </div>
    <div class="mb-4">
        <label class="block text-sm font-medium leading-6 text-gray-900">File</label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <input accept=".mp3" type="file" bind:files
                   class="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
    </div>
    <div class="flexElements centerElements">
        <button on:click={handleSubmit}
                class="mt-5 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
            Get URL!
        </button>
    </div>
</div>

<style>
    #songForm {
        min-width: 400px;
    }
</style>
