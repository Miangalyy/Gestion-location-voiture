<template>
    <div>
        <div class="enveloppe">
            <span class="material-icons-sharp warning">warning</span>
            <h1>Vous devez se connecter pour visualiser la liste des proprietaires</h1>
            <router-link to="/" class="item add-product">   
                <h2>Se connecter</h2>  
            </router-link>
        </div>
    </div>
</template>
<style scoped>
   .enveloppe {
    width: 800px;
    background: var(--color-white);
    top: 150px;
    left: 550px;
    position: absolute;
    border-radius: 10px;
    padding: 40px 25px;
    box-shadow: var(--box-shadow);
    text-align: center;
    padding: 150px;
   }
   .enveloppe span {
    margin-top: -100px;
    margin-bottom: 50px;
    color: var(--color-warning);
    font-size: 8rem;
   }
   .enveloppe .item {
    border: 2px dashed var(--color-warning);
    color: var(--color-warning);
    transition: .4s ease-in-out;
   }
   .enveloppe .item:hover {
    background: var(--color-warning);
    color: var(--color-white);
   }
   @media screen and (max-width: 1200px) {
    .enveloppe {
        width: 600px;
        left: 290px;
        top: 200px;
        padding: 100px;
      }
      .enveloppe h1 {
          font-size: 1.2rem;
         }
      .enveloppe span {
          margin-top: -20px;
          margin-bottom: 20px;
          font-size: 5rem;
      }
   }
   @media screen and (max-width: 768px) {
    .enveloppe {
      width: 400px;
      left: 120px;
      top: 250px;
      padding: 50px;
    }
    .enveloppe h1 {
        font-size: 1.2rem;
       }
    .enveloppe .warning {
        margin-top: -10px;
        margin-bottom: 10px;
        font-size: 5rem;
    }
   }
</style>