const vm = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto: false,
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        }
    },
    methods: {

        fetchProdutos() {
            fetch("./api/produtos.json")
                .then(r => r.json())
                .then(json => this.produtos = json)
        },

        fetchProduto(id) {
            fetch(`./api/produtos/${id}/dados.json`)
                .then(r => r.json())
                .then(json => {
                    setTimeout(() => {
                        this.produto = json
                    }, 100);
                })
        },

        abrirModal(id) {
            this.fetchProduto(id)
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },

        fecharModal({
            target,
            currentTarget
        }) {
            if (target === currentTarget)
                this.produto = false
        }
    },

    created() {
        this.fetchProdutos()
    }
})