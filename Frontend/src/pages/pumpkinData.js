import React from 'react';

function pumpkinData() {
    return (
      <h1>Are you done carving?</h1>,
      <form action="/api/completion" method="post">
      <button type="stepComplete">Cutting complete</button>
    </form>
    );
}

export default pumpkinData;