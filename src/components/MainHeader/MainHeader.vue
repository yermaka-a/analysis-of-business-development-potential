<script setup lang="ts">


</script>

<template>
   <header class="header">
        <div class="logo">Автоматизированный анализ потенциала развития бизнеса</div>
    </header>
</template>



<style lang="scss" scoped>
 .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            margin-bottom: 20px;
        }

        .logo {
            font-size: 2rem;
            font-weight: bold;
            background: linear-gradient(90deg, #0056A0, #A50034); /* Градиент синий и красный */
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientAnimation 5s ease infinite;
        }

        .menu-toggle {
            text-decoration: none;
            color: #333;
            font-size: 1.2rem;
            padding: 10px 15px;
            background: #0056A0; /* Синий цвет */
            color: white;
            border-radius: 5px;
            transition: background 0.3s;
        }

        .menu-toggle:hover {
            background: #A50034; /* Красный цвет при наведении */
        }

        @keyframes gradientAnimation {
            0% {
                background-position: 0%;
            }
            50% {
                background-position: 100%;
            }
            100% {
                background-position: 0%;
            }
          }
</style>
