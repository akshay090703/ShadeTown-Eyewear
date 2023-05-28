const sunglassesOptions = {
  models: [
    {
      name: "aviator",
      price: 300,
      thumbImg: "thumb-aviator.png",
      cssClass: "frame-aviator",
    },
    {
      name: "half-frame",
      price: 200,
      thumbImg: "thumb-half-frame.png",
      cssClass: "frame-half",
    },
    {
      name: "round",
      price: 250,
      thumbImg: "thumb-round.png",
      cssClass: "frame-round",
    },
    {
      name: "wayfarer",
      price: 250,
      thumbImg: "thumb-wayfarer.png",
      cssClass: "frame-wayfarer",
    },
  ],
  lenses: [
    {
      color: "sepia",
      price: 20,
      cssClass: "color-sepia",
    },
    {
      color: "rainbow",
      price: 50,
      cssClass: "color-rainbow",
    },
    {
      color: "iridescent",
      price: 30,
      cssClass: "color-iridescent",
    },
  ],
  frames: [
    {
      color: "charcoal",
      price: 0,
      cssClass: "color-charcoal",
    },
    {
      color: "tan",
      price: 0,
      cssClass: "color-tan",
    },
    {
      color: "rose",
      price: 0,
      cssClass: "color-rose",
    },
  ],
};

const sunglasses = {
  model: {
    name: "aviator",
    price: 300,
    thumbImg: "./images/thumb-aviator.png",
    cssClass: "frame-aviator",
  },
  lenses: {
    color: "sepia",
    price: 20,
    cssClass: "color-sepia",
  },
  frame: {
    color: "charcoal",
    price: 0,
    cssClass: "color-charcoal",
  },
};

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productFrames = document.getElementsByClassName("product-image_frame")[0];
const productLenses = document.getElementsByClassName(
  "product-image_lenses"
)[0];

let sunglassesNew = null;

function setSunglasses(newSunglasses = sunglasses) {
  sunglassesNew = newSunglasses;
}

function render(newSunglasses) {
  const { model, lenses, frame } = newSunglasses;
  const price = `$${model.price + lenses.price + frame.price}`;

  productDetailsEl.innerHTML = `
      <h1>${model.name}</h1>
      <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
      <p>${price}</p>
    `;

  const currClass = productImage.classList[1];
  productImage.classList.replace(currClass, model.cssClass);

  const currFramesClass = productFrames.classList[1];
  productFrames.classList.replace(currFramesClass, frame.cssClass);

  const currLensesClass = productLenses.classList[1];
  productLenses.classList.replace(currLensesClass, lenses.cssClass);
}

// Highlight current selection
function addHighlight(clickedItem) {
  const siblings = Array.from(
    clickedItem.closest("ul").querySelectorAll("button")
  );

  siblings.forEach((swatch) => {
    swatch.classList.remove("selected");
  });

  clickedItem.classList.add("selected");
}

document.body.addEventListener("click", function (event) {
  const clickedItem = event.target;

  if (!sunglassesNew) {
    sunglassesNew = { ...sunglasses };
  }

  // Update model
  if (clickedItem.classList.contains("product-thumb")) {
    const currName = clickedItem.dataset.name;

    const modelOptions = sunglassesOptions.models.find(
      (item) => item.name === currName
    );

    const { name, price, thumbImg, cssClass } = modelOptions;

    sunglassesNew = {
      model: {
        name,
        price,
        thumbImg: sunglassesNew.model.thumbImg,
        cssClass,
      },
      lenses: { ...sunglassesNew.lenses },
      frame: { ...sunglassesNew.frame },
    };

    addHighlight(clickedItem);
    setSunglasses(sunglassesNew);
    render(sunglassesNew);
  }

  // Update colors for frames/lenses
  if (clickedItem.classList.contains("product-color-swatch")) {
    const currColor = clickedItem.dataset.color;
    let colorOptions, color, price, cssClass;

    if (clickedItem.closest("div").classList[0] === "product-lenses") {
      colorOptions = sunglassesOptions.lenses.find(
        (item) => item.color === currColor
      );
      ({ color, price, cssClass } = colorOptions);

      sunglassesNew = {
        ...sunglassesNew,
        lenses: {
          color,
          price,
          cssClass,
        },
      };
    } else {
      colorOptions = sunglassesOptions.frames.find(
        (item) => item.color === currColor
      );
      ({ color, price, cssClass } = colorOptions);

      sunglassesNew = {
        ...sunglassesNew,
        frame: {
          color,
          price,
          cssClass,
        },
      };
    }

    addHighlight(clickedItem);
    setSunglasses(sunglassesNew);
    render(sunglassesNew);
  }
});

render(sunglasses);
