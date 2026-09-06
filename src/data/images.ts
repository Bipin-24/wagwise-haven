/**
 * Central image registry. Swap a single entry here to change a picture
 * everywhere it appears — no component edits needed.
 */
import logo from "@/assets/logo.png.asset.json";
import brothersTogether from "@/assets/brothers-together.jpg.asset.json";
import brunoSofa from "@/assets/bruno-sofa.jpg.asset.json";
import brunoRest from "@/assets/bruno-rest.jpg.asset.json";
import brunoBalcony from "@/assets/bruno-balcony.jpg.asset.json";
import brunoSit from "@/assets/bruno-sit.jpg.asset.json";
import goofyGarden from "@/assets/goofy-garden.jpg.asset.json";
import goofyParent from "@/assets/goofy-parent.jpg.asset.json";
import goofyTree from "@/assets/goofy-tree.jpg.asset.json";

import boarding from "@/assets/gen/boarding.jpg";
import training from "@/assets/gen/training.jpg";
import vet from "@/assets/gen/vet.jpg";
import food from "@/assets/gen/food.jpg";
import grooming from "@/assets/gen/grooming.jpg";
import walking from "@/assets/gen/walking.jpg";
import community from "@/assets/gen/community.jpg";
import productPack from "@/assets/gen/product-pack.jpg";
import productTreats from "@/assets/gen/product-treats.jpg";
import productFresh from "@/assets/gen/product-fresh.jpg";

export const img = {
  logo: logo.url,
  brothers: brothersTogether.url,
  brunoSofa: brunoSofa.url,
  brunoRest: brunoRest.url,
  brunoBalcony: brunoBalcony.url,
  brunoSit: brunoSit.url,
  goofyGarden: goofyGarden.url,
  goofyParent: goofyParent.url,
  goofyTree: goofyTree.url,
  boarding,
  daycare: community,
  training,
  vet,
  food,
  grooming,
  walking,
  community,
  productPack,
  productTreats,
  productFresh,
};
