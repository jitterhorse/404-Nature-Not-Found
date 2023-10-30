<template>
  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  <ul>
    <li>
      <input
        id="f-option"
        type="radio"
        name="selector"
      >
      <label for="f-option">Pizza</label>

      <div class="check" />
    </li>

    <li>
      <input
        id="s-option"
        type="radio"
        name="selector"
      >
      <label for="s-option">Bacon</label>

      <div class="check">
        <div class="inside" />
      </div>
    </li>

    <li>
      <input
        id="t-option"
        type="radio"
        name="selector"
      >
      <label for="t-option">Cats</label>

      <div class="check">
        <div class="inside" />
      </div>
    </li>
  </ul>
  <button
    class="okay"
    @click="showPage404"
  >
    Lorem ipsum
  </button>
</template>

<style scoped>
button {
  border: 2px solid black;
  font: inherit;
  padding: 0 calc(2 * var(--padding));
}
button.icon {
  width: 2rem;
  height: 2rem;
  padding: 0;
}
button.okay {
  align-self: end;
}


.container ul{
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;
}

ul li {
  display: block;
  position: relative;
  width: 100%;
  padding-bottom: 0.5em;
}

ul li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

ul li label{
  display: block;
  font-size: inherit;
  padding: 0 5px 5px 60px;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
}

ul li:hover label{
  color: #FFFFFF;
}

ul li .check{
  display: block;
  position: absolute;
  border: 5px solid black;
  border-radius: 100%;
  height: 1em;
  width: 1em;
  top: 0;
  left: 0;
  z-index: 5;
  transition: border .25s linear;
  -webkit-transition: border .25s linear;
}

ul li:hover .check {
  border: 5px solid #FFFFFF;
}

ul li .check::before {
  display: block;
  position: absolute;
  content: '';
  border-radius: 100%;
  height: 0.6em;
  width: 0.6em;
  top: 0.2em;
  left: 0.2em;
  margin: auto;
  transition: background 0.25s linear;
  -webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check::before{
  background: black;
}

</style>