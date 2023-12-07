await Bun.serve({
    development: true,
    fetch(req) {
        return new Response("Bun!");
    },
});