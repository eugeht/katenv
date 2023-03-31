<script setup lang="ts">
// Vue
import { ref, type Ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
// Helpers
import { sleep, rand } from '@/utils/helpers'
// Assets - img
import ChatLogoPng from '@/assets/images/chat@2x.png'
import ChatLogoAvif from '@/assets/images/chat@2x.avif'
import ChatLogoWebp from '@/assets/images/chat@2x.webp'
import ChatHeart from '@/assets/images/heart.gif'
// Assets - video
import ChatVideoMp4 from '@/assets/video/kitten.mp4'
import ChatVideoWebm from '@/assets/video/kitten.webm'



// Messages --------------------------------------------------------------------
const MessagesBlockRef: Ref<HTMLDivElement | undefined> = ref()

type MessageAuthor = 'user' | 'kitten'
type Message = {
  author: MessageAuthor
  text: string
}

// Messages list
const messages: Ref<Message[]> = ref( [] )


// Messages - Send message
const sendMessage = async ( author: MessageAuthor, text: string ) => {
  messages.value.push({
    author: author,
    text: text
  })

  if ( MessagesBlockRef.value ) {
    await nextTick()
    MessagesBlockRef.value.scrollTop = MessagesBlockRef.value.scrollHeight
  }
}



// User Interactions -----------------------------------------------------------
const UserInputRef: Ref<HTMLTextAreaElement | undefined> = ref()

// Current input text
const message: Ref<string> = ref( '' )


// Textarea resize on input handler
const userInputResizeHandler = () => {
  if ( !UserInputRef.value ) {
    return
  }

  UserInputRef.value.style.removeProperty( 'height' )
  UserInputRef.value.style.height = `${ UserInputRef.value.scrollHeight }px`;
}

// Send user message
const sendUserMessage = async () => {
  if ( message.value ) {
    await sendMessage( 'user', message.value )
  } else {
    await sendMessage( 'user', 'meow' )
  }

  message.value = ''

  await nextTick()
  userInputResizeHandler()

  void prepareKittenMessage()
}



// Kitten ----------------------------------------------------------------------
const kittenId = rand(1, 100)
const KittenVideoRef: Ref<HTMLVideoElement | undefined> = ref()

// Timeout for next kitten message
let kittenActivityTimeout: ReturnType<typeof setTimeout> | null = null

// Timestamp of last message
let kittenLastMessageTimestamp: number = 0


// Generate sentence
const generateKittenSentence = () => {
  let text = ' meow'.repeat( rand(1, 5) )

  if ( rand(1, 10) >= 5 ) {
    text += '.'
  } else if ( rand(1, 10) >= 9 ) {
    text += '?'
  } else if ( rand(1, 10) >= 8 ) {
    text += '!'
  } else if ( rand(1, 10) >= 8 * 1 ) {
    text += '...'
  }

  return text
}


// Generate full message
const generateKittenMessage = () => {
  if ( rand(1, 100) >= 98 ) {
    return 'Help me! my name is Igor and i’m stuck in a cat body'
  }

  if ( rand(1, 20) >= 19 ) {
    return '💜'.repeat( rand(3, 10) )
  }

  let text = generateKittenSentence()

  
  if ( messages.value[ messages.value.length - 1 ] && messages.value[ messages.value.length - 1 ].author === 'user' ) {
    const userMessages = messages.value.filter( m => m.author === 'user' )

    if ( rand(1, 10) >= 9 || userMessages[ userMessages.length - 1 ] && userMessages[ userMessages.length - 1 ].text.length > 50 ) {
      const len = rand( 4, 14 )
      for ( let i = 0; i < len; i++ ) {
        text += generateKittenSentence()
      }
    }
  }

  return text.trim()
}


// Send message
const sendKittenMessage = () => {
  if ( kittenLastMessageTimestamp && ( kittenLastMessageTimestamp > ( new Date ).getTime() - 800 ) ) {
    return
  }

  const text = generateKittenMessage()
  sendMessage( 'kitten', text )

  kittenLastMessageTimestamp = ( new Date ).getTime()

  kittenActivityTimeout && clearTimeout( kittenActivityTimeout )

  kittenActivityTimeout = setTimeout( () => {
    prepareKittenMessage()
  }, rand( 20000, 30000 ) )
}


// Activate kitten
const prepareKittenMessage = async () => {
  if ( !KittenVideoRef.value ) {
    return
  }

  KittenVideoRef.value.loop = true
  KittenVideoRef.value.play()

  await sleep( rand(500, 1500) )

  if ( rand(1, 10) >= 7 ) {
    sendKittenMessage()
  }

  await sleep( rand(1000, 3000) )

  if ( KittenVideoRef.value ) {
    KittenVideoRef.value.loop = false
  }
}


// Lifecycle hooks - init first message activity
onMounted( async () => {
  if ( KittenVideoRef.value ) {
    KittenVideoRef.value.addEventListener("ended", () => {
      sendKittenMessage()
    });
  }
})

// Lifecycle hooks - clear timeouts
onBeforeUnmount( () => {
  kittenActivityTimeout && clearTimeout( kittenActivityTimeout )
})

</script>



<template>
  <main class="chat">
    <div class="chat-logo">
      <div class="chat-logo-inner">
        <picture class="chat-logo-picture">
          <source :srcset="ChatLogoWebp" type="image/webp" />
          <source :srcset="ChatLogoAvif" type="image/avif" />
          <img 
            class="chat-logo-picture__img" 
            :src="ChatLogoPng" 
            width="797"
            height="224"
            alt="meow chat logo"
          />
        </picture>
        <img 
          class="chat-logo-heart" 
          :src="ChatHeart" 
          width="110"
          height="110"
          alt="heart picture"
        />
      </div>
    </div>
    <div class="chat-interface">
      <div class="chat-interface__cat">
        <video 
          ref="KittenVideoRef"
          class="chat-kitten"
          muted
          autoplay
          playsinline
          width="1280"
          height="720"
        >
          <source :src="ChatVideoWebm" type="video/webm">
          <source :src="ChatVideoMp4" type="video/mp4">
        </video>
      </div>
      <div class="chat-interface__form chat-form">
        <div class="chat-form__inner">
          <div 
            ref="MessagesBlockRef"
            class="chat-form__screen"
          >
            <p
              v-for="message, i in messages"
              :key="`message_${ i }`"
              class="chat-message"
              :class="{
                'chat-message--in': message.author === 'kitten',
                'chat-message--out': message.author === 'user'
              }"
            >
              {{ message.author === 'user' ? 'you: ' : `cat_${ kittenId }: ` }}
              {{ message.text }}
            </p>
          </div>
          <div class="chat-form-controls">
            <textarea 
              v-model="message"
              placeholder="Start typing..."
              class="chat-form-controls__input"
              ref="UserInputRef"
              @input="userInputResizeHandler()"
              @keydown.exact.enter.prevent="sendUserMessage"
            ></textarea>
            <button 
              class="chat-form-controls__submit" 
              type="button"
              @click="sendUserMessage"
            >
              meow
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>



<style lang="scss">

.chat {
  --chat-width: 100%;
  
  position: relative;
  
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  
  padding-top: 1rem;
  padding-bottom: 3rem;

  flex-direction: column;
  
  @media only screen and (min-width: 900px) {
    --chat-width: 60%;
  }
}

.chat-logo {
  width: var(--chat-width);
  margin-left: auto;
  text-align: center;
}

.chat-logo-inner {
  position: relative;

  max-width: 80%;
  margin: 0 auto 20px;
}

.chat-logo-heart {
  position: absolute;
  top: -16px;
  right: -32px;

  width: 15%;
  min-width: 64px;
}

.chat-logo-picture {
  position: relative;
  z-index: 1;

  display: block;
}

.chat-logo-picture__img {
  max-width: 100%;
  display: block;
}


.chat-interface {
  display: flex;

  flex-direction: column;
  align-items: flex-end;

  flex: 1 0 auto;
  
  @media only screen and (min-width: 900px) {
    flex-direction: row;
  }
}

.chat-interface__cat {
  // width: 220px;
  // max-width: 90%;
  margin: -30px auto 10px;

  flex: 0 0 auto;
  overflow: hidden;

  @media only screen and (min-width: 900px) {
    flex: 0 1 auto;
    margin-top: 0;
    margin-bottom: 0;
    max-width: unset;
    width: unset;
  }
}

.chat-interface__form {
  width: var(--chat-width);

  flex: 0 1 var(--chat-width);
  
  @media only screen and (min-width: 900px) {
    flex-shrink: 0;
  }
}

.chat-kitten {
  max-width: 500px;
  width: 110%;
  height: auto;
  display: block;
  margin: 0 -10% 0 -3%;
  
  @media only screen and (min-width: 900px) {
    max-width: 720px;
    width: 120%;
    margin: 0 -7% 0 -7%;
  }
}

.chat-form {
  position: relative;
  
  @media only screen and (min-width: 450px) {
    height: 100%;
  }
}

.chat-form__inner {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
}

.chat-form__screen {
  min-height: 100px;
  padding: 0.75em 1em;
  overflow: auto;

  flex: 1;
  background: #D9D9D9;
  word-break: break-all;
}

.chat-form-controls {
  margin-top: 10px;
  display: flex;

  flex-direction: column;
  align-items: flex-end;
  
  @media only screen and (min-width: 450px) {
    flex-direction: row;
  }
}

.chat-form-controls__input {
  width: 100%;
  height: 3em;
  max-height: 6em;
  min-height: 3em;
  padding: 10px;
  padding: 0.75em 1em;
  
  flex: 1 0 auto;
  font-size: rem(16px);
  background: #d6d6d6;
  border: none;
  font-family: "Space Grotesk", sans-serif;
  line-height: 1.5;
  resize: none;
  
  @media only screen and (min-width: 450px) {
    font-size: rem(22px);
    width: auto;
  }
}

.chat-form-controls__submit {
  width: 100%;
  padding: 0.75em 2em;
  margin-top: 10px;

  flex-shrink: 0;
  background: #8DC6EF;
  border: none;
  font-size: rem(16px);
  font-family: "Space Grotesk", sans-serif;
  line-height: 1.5;
  
  @media only screen and (min-width: 450px) {
    font-size: rem(22px);
    margin-top: 0;
    margin-left: 10px;
    width: auto;
  }
}

.chat-message {
  line-height: 1.4;
  font-size: rem(16px);
  margin-bottom: 0;
  
  @media only screen and (min-width: 450px) {
    font-size: rem(22px);
  }

  &.chat-message--in {
    color: #FA3030;

    & + .chat-message--out {
      margin-top: 6px;
    }
  }

  &.chat-message--out {
    color: #0C32B7;

    & + .chat-message--in {
      margin-top: 6px;
    }
  }
}

</style>
