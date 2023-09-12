<template>
 <div class="chessboard">
   <div v-for="(row, rowIndex) in board" :key="rowIndex" class="chess-row">
     <div
       v-for="(square, columnIndex) in row"
       :key="columnIndex"
       class="chess-square"
       :class="{ 'black-square': (rowIndex + columnIndex) % 2 === 1 }"
     >
       <img v-if="square.piece" :src="getImagePath(square.piece)" alt="Chess Piece" />
     </div>
   </div>
 </div>
</template>

<script setup>
const board = Array(8).fill(null).map(() => Array(8).fill({ piece: null }));

const getImagePath = (piece) => {
 // Define the mapping between piece names and image paths
 // For example: 'pawn' -> 'path/to/pawn-image.png'
 // Return the appropriate image path based on the piece name
};
</script>

<style scoped>
.chessboard {
 display: flex;
 flex-direction: column;
}

.chess-row {
 display: flex;
}

.chess-square {
 width: 50px;
 height: 50px;
 display: flex;
 align-items: center;
 justify-content: center;
 border: 1px solid #ffffff;
}

.black-square {
 background-color: #b58863;
}

img {
 max-width: 100%;
 max-height: 100%;
}
</style>
  