import { shallowMount, createLocalVue, shallow } from "@vue/test-utils";
import PokemonList from "@/components/PokemonList.vue";
import Vuex from "vuex";
import axios from "axios";
const localVue = createLocalVue();

localVue.use(Vuex);
//jest.mock('axios');

describe("Pokemon List", () => {
  let store;
  let wrapper = null;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    });
    wrapper = shallowMount(PokemonList, {
      propsData: { showOnlyFavorite: false },
      stubs: ["router-link"],
      store: store,
      localVue
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("component should create", () => {
    expect(wrapper.showOnlyFavorite).toBeFalsy();
  });
  it("validate get pokemon list function is called", async () => {
    const getPokemonList = jest.spyOn(wrapper.methods, "getPokemonList");
    expect(getPokemonList).toHaveBeenCalled();
  });
});
