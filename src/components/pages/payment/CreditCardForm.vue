<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { CreditCard } from './CreditCardForm/index';

@Component({ components: { CreditCard } })
export default class CreditCardForm extends Vue {
  public currentCardBackground: string = require('@/assets/images/banner-subheader.jpg');
  public cardName: string = '';
  public cardNumber: string = '';
  public cardMonth: number = 0;
  public cardYear: number = 0;
  public cardCvv: string = '';
  public minCardYear: number = new Date().getFullYear();
  public otherCardMask: string = '#### #### #### ####';
  public cardNumberTemp: string = '';
  public isCardFlipped: boolean = false;
  public focusElementStyle: any = null;
  public isInputFocused: boolean = false;

  public mounted(): void {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById('cardNumber').focus();
  }

  get generateCardNumberMask(): string {
    return this.otherCardMask;
  }

  get minCardMonth(): number {
    if (this.cardYear === this.minCardYear) {
      return new Date().getMonth() + 1;
    }
    return 1;
  }

  @Watch('cardYear')
  public watchCardYear(): void {
    if (this.cardMonth < this.minCardMonth) {
      this.cardMonth = undefined;
    }
  }

  public flipCard(status): void {
    this.isCardFlipped = status;
  }

  public focusInput(e): void {}

  public blurInput(): void {
    const vm = this;
    setTimeout(() => {
      if (!vm.isInputFocused) {
        vm.focusElementStyle = null;
      }
    }, 300);
    vm.isInputFocused = false;
  }
}
</script>

<template>
  <div class="card-form mt-4">
    <CreditCard
      :currentCardBackground="currentCardBackground"
      :cardName="cardName"
      :cardNumber="cardNumber"
      :cardMonth="cardMonth"
      :cardYear="cardYear"
      :cardCvv="cardCvv"
      :minCardYear="minCardYear"
      :otherCardMask="otherCardMask"
      :cardNumberTemp="cardNumberTemp"
      :isCardFlipped="isCardFlipped"
      :focusElementStyle="focusElementStyle"
      :isInputFocused="isInputFocused" />

    <div class="card-form__inner">
      <div class="card-input">
        <label for="cardNumber" class="card-input__label">Número do Cartão</label>
        <input
          type="text"
          id="cardNumber"
          class="card-input__input"
          v-mask="generateCardNumberMask"
          v-model="cardNumber"
          v-on:focus="focusInput"
          v-on:blur="blurInput"
          data-ref="cardNumber"
          autocomplete="off" />
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">Títular do Cartão</label>
        <input
          type="text"
          id="cardName"
          class="card-input__input"
          v-model="cardName"
          v-on:focus="focusInput"
          v-on:blur="blurInput"
          data-ref="cardName"
          autocomplete="off" />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label">Data de Vencimento</label>
            <select
              class="card-input__input -select"
              id="cardMonth"
              v-model="cardMonth"
              v-on:focus="focusInput"
              v-on:blur="blurInput"
              data-ref="cardDate">
              <option value="" disabled selected>Mês</option>
              <option :value="n < 10 ? '0' + n : n" v-for="n in 12" :disabled="n < minCardMonth" :key="n">
                {{ n &lt; 10 ? '0' + n : n }}
              </option>
            </select>
            <select
              class="card-input__input -select"
              id="cardYear"
              v-model="cardYear"
              v-on:focus="focusInput"
              v-on:blur="blurInput"
              data-ref="cardDate">
              <option value="" disabled selected>Ano</option>
              <option :value="$index + minCardYear" v-for="(n, $index) in 12" :key="n">
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">CVV</label>
            <input
              type="text"
              class="card-input__input"
              id="cardCvv"
              v-mask="'####'"
              maxlength="4"
              v-model="cardCvv"
              v-on:focus="flipCard(true)"
              v-on:blur="flipCard(false)"
              autocomplete="off" />
          </div>
        </div>
      </div>

      <button class="card-form__button primary">Atualizar</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap');

.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;

  @media screen and (max-width: 576px) {
    margin: 0 auto;
  }

  &__inner {
    background: #fff;
    // box-shadow: 3px 13px 30px 0px rgba(21, 34, 67, 0.2);
    box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
    border-radius: 10px;
    padding: 35px;
    padding-top: 180px;

    @media screen and (max-width: 480px) {
      padding: 25px;
      padding-top: 165px;
    }
    @media screen and (max-width: 360px) {
      padding: 15px;
      padding-top: 165px;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 480px) {
      flex-wrap: wrap;
    }
  }

  &__col {
    flex: auto;
    margin-right: 35px;

    &:last-child {
      margin-right: 0;
    }

    @media screen and (max-width: 480px) {
      margin-right: 0;
      flex: unset;
      width: 100%;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &.-cvv {
      max-width: 150px;
      @media screen and (max-width: 480px) {
        max-width: initial;
      }
    }
  }

  &__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .card-input__input {
      flex: 1;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__button {
    width: 100%;
    height: 55px;
    background: #2364d2;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 500;
    font-family: 'Source Sans Pro', sans-serif;
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
    color: #fff;
    margin-top: 20px;
    cursor: pointer;

    @media screen and (max-width: 480px) {
      margin-top: 10px;
    }
  }
}

.card-input {
  margin-bottom: 20px;
  &__label {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 500;
    color: #1a3b5d;
    width: 100%;
    display: block;
    user-select: none;
  }
  &__input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    box-shadow: none;
    border: 1px solid #ced6e0;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 5px 15px;
    background: none;
    color: #1a3b5d;
    font-family: 'Source Sans Pro', sans-serif;

    &:hover,
    &:focus {
      border-color: #3d9cff;
    }

    &:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }
    &.-select {
      -webkit-appearance: none;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC');
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }
  }
}
</style>
