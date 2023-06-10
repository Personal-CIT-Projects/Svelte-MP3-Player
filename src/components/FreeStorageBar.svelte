<script>
    import axios from "axios";
    import {onMount} from "svelte";

    let percentage = 0

    onMount(() => {
        axios.get("song/storage")
            .then(response => percentage = (response.data.used / response.data.reserved) * 100)
    })

    let color = "bg-blue-600"
    if (percentage > 65) color = "bg-yellow-400"
    if (percentage > 85) color = "bg-red-600"
</script>

<div class="mb-1 text-base font-medium">Storage Used</div>
<div class="w-full bg-gray-200 rounded-full h-1.5 mb-4">
    <div class="h-1.5 rounded-full {color}" style="width: {percentage}%"></div>
</div>
