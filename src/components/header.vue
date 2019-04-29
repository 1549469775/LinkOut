<template>
  <header>
    <div class="button-border">
      <button class="button">Submit</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  background-color: #c47135;
  border: none;
  color: #ffffff;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
}
.button:before,
.button:after {
  border: 0 solid transparent;
  transition: all 0.25s;
  content: "";
  height: 24px;
  position: absolute;
  width: 24px;
}
.button:before {
  border-top: 2px solid #c47135;
  left: 0px;
  top: -5px;
}
.button:after {
  border-bottom: 2px solid #c47135;
  bottom: -5px;
  right: 0px;
}
.button:hover {
  background-color: #c47135;
}
.button:hover:before,
.button:hover:after {
  height: 100%;
  width: 100%;
}
</style>

