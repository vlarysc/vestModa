<template>
  <div class="row">
    {{ produto }}
    <div v-for="(produto, i) in vestModa" :key="i" class="col-md-3 col-sm-6">
      <div class="product-grid">
        <div class="product-image">
          <a href="#" class="image">
            <img class="pic-1" :src="produto.foto" />
            <img class="pic-2" :src="produto.foto" />
          </a>
          <a href="" class="product-like-icon"><i class="far fa-heart"></i></a>
          <ul class="product-links">
            <li>
              <a href="#"><i class="far fa-heart"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa fa-random"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa fa-eye"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa fa-shopping-cart"></i></a>
            </li>
          </ul>
        </div>
        <div class="product-content">
          <h3 class="title">
            <a href="#">{{ produto.produto }}</a>
          </h3>
          <div class="price">{{ produto.preco }}</div>
        </div>
      </div>
    </div>
    <div style="height: 700px"></div>
  </div>
</template>

<script>
import groupBy from "lodash.groupby";
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      vestModa: []
    };
  },
  computed: {
    ...mapState({ produto: (state) => state.no_produto }),
    grupoMeses() {
      let grupoMeses = [];

      const mesAtual = () => {
        grupoMeses.push({
          data: [],
          total: 0,
          mes: moment().format("MM/YYYY")
        });
      };

      if (this.vestModa.length) {
        const meses = groupBy(this.vestModa, (i) => {
          return moment(i.createdAt).format("MM/YYYY");
        });

        const sortMes = Object.keys(meses).sort((a, b) => {
          if (moment(`${a} 01`, "MM/YYYY HH").isBefore(moment(`${b} 01`, "MM/YYYY HH"))) {
            return -1;
          } else {
            return +1;
          }
        });

        grupoMeses = sortMes.map((mes) => ({
          mes,
          data: meses[mes],
          total: meses[mes].map((i) => +i.valor).reduce((a, c) => a + c, 0)
        }));

        const ultimoMes = moment(grupoMeses[grupoMeses.length - 1].mes, "MM/YYYY");

        if (!ultimoMes.isSame(moment(), "mes")) {
          mesAtual();
        }
      } else {
        mesAtual();
      }
      return grupoMeses;
    }
  },
  created() {
    console.log("oiii", this.getDados());
  },
  methods: {
    ...mapActions({ getDados: "getDados" }),
    remover() {
      console.log("Remover", this.$firebase);
    }
  }
};
</script>

<style>
.product-grid {
  background-color: #fff;
  font-family: "Lato", sans-serif;
  text-align: center;
}
.product-grid .product-image {
  position: relative;
}
.product-grid .product-image a.image {
  display: block;
}
.product-grid .product-image img {
  width: 100%;
  height: auto;
}
.product-grid:hover .product-image .pic-1 {
  opacity: 0;
  transition: all 0.5s ease 0s;
}
.product-image .pic-2 {
  width: 100%;
  height: 100%;
  filter: blur(10px);
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s ease 0s;
}
.product-grid:hover .product-image .pic-2 {
  filter: blur(0);
  opacity: 1;
}
.product-grid .product-like-icon {
  color: #999;
  font-size: 16px;
  position: absolute;
  right: 13px;
  top: 10px;
  transition: all 0.3s ease 0s;
}
.product-grid .product-like-icon:hover {
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}
.product-grid .product-links {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  opacity: 0;
  transform: translateX(-50%) scale(0);
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  z-index: 1;
  transition: all 0.3s ease;
}
.product-grid:hover .product-links {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
.product-grid .product-links li {
  display: inline-block;
}
.product-grid .product-links li a {
  color: #fff;
  background: #333;
  font-size: 16px;
  line-height: 38px;
  width: 40px;
  height: 40px;
  display: block;
  transition: all 0.3s ease 0s;
}
.product-grid .product-links li a:hover {
  color: #fff;
  background: var(--featured);
}
.product-grid .product-content {
  background-color: #fff;
  padding: 10px 10px 10px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease 0s;
}
.product-grid:hover .product-content {
  transform: translateY(47px);
}
.product-grid .title {
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0 0 7px;
}
.product-grid .title a {
  color: #222;
  transition: all 0.3s ease 0s;
}
.product-grid .title a:hover {
  color: var(--featured);
}
.product-grid .price {
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
@media screen and (max-width: 990px) {
  .product-grid {
    margin: 0 0 30px;
  }
}
</style>
