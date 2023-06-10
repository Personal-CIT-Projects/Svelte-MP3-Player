<script>
    import Banner from "./layout/Banner.svelte";
    import SongForm from "./components/SongForm.svelte";
    import SongsTable from "./components/SongsTable.svelte";
    import FreeStorageBar from "./components/FreeStorageBar.svelte";
</script>

<main>
    <Banner />
    <div class="flexElements centerElements mt-6">
        <div class="m-5">
            <SongForm />
        </div>
        <div class="mx-12">

        </div>
        <div class="m-5">
            <FreeStorageBar />
            <SongsTable />
        </div>
    </div>
</main>
