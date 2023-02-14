import React from 'react';

function search() {
    return (
        <form action="/api/pidSearch" method="post">
        <label for="pid">Enter pumpkin ID:</label>
        <input type="text" id="pid" name="pid" />
        <button type="submit">Submit</button>
      </form>
    );
}

export default search;