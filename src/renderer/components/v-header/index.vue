<template>
    <header>
        <div class="em-spots">
            <span
                class="decorate"
                style="background: rgb(255, 86, 0); width: 34px; height: 34px; margin-top: -17px; margin-left: -17px; top: 80.1769%; left: 5%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(23, 90, 171); width: 52px; height: 52px; margin-top: -26px; margin-left: -26px; top: 40.4299%; left: 15%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(57, 38, 115); width: 48px; height: 48px; margin-top: -24px; margin-left: -24px; top: 48.8031%; left: 25%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(0, 135, 231); width: 37px; height: 37px; margin-top: -18.5px; margin-left: -18.5px; top: 31.4133%; left: 35%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(233, 34, 36); width: 51px; height: 51px; margin-top: -25.5px; margin-left: -25.5px; top: 52.4444%; left: 45%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(57, 38, 115); width: 24px; height: 24px; margin-top: -12px; margin-left: -12px; top: 74.1552%; left: 55%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(57, 38, 115); width: 46px; height: 46px; margin-top: -23px; margin-left: -23px; top: 21.2004%; left: 65%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(57, 38, 115); width: 30px; height: 30px; margin-top: -15px; margin-left: -15px; top: 88.2094%; left: 75%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(23, 90, 171); width: 43px; height: 43px; margin-top: -21.5px; margin-left: -21.5px; top: 43.0932%; left: 85%;"
            ></span
            ><span
                class="decorate"
                style="background: rgb(57, 38, 115); width: 51px; height: 51px; margin-top: -25.5px; margin-left: -25.5px; top: 21.7012%; left: 95%;"
            ></span>
        </div>
        <div class="em-container">
            <div class="em-icon">
                <i :class="icon"></i>
            </div>
            <div class="em-text">
                <h2>{{ name }}</h2>
                <slot name="describe"></slot>
                <p>{{ describe }}</p>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "v-header",
    props: ["icon", "name", "describe"]
};
</script>

<style scoped>
header {
    position: relative;
    overflow: hidden;
    padding: 30px 0;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    overflow-y: hidden;
    width: 100%;
    transition: all 0.3s;
}
.decorate {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4b89fc;
    position: absolute;
    left: 200px;
    opacity: 0.13;
}
.em-container {
    padding: 0 20px;
    max-width: 1020px;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.em-container .em-icon {
    width: 50px;
    height: 50px;
    background: #2d8cf0;
    border-radius: 4px;
    -webkit-box-shadow: 0 10px 50px rgba(45, 140, 240, 0.4);
    box-shadow: 0 10px 50px rgba(45, 140, 240, 0.4);
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 50px;
    margin-right: 14px;
}
.em-container .em-text {
    display: inline-block;
    text-align: left;
}
.em-container h2 {
    font-weight: bold;
}
.em-container p {
    margin-top: 10px;
    font-size: 12px;
    color: #9a9ca0;
}
</style>