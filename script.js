const base_url = "https://api.zotero.org";
user_id = "12181477"
group_id = "5969464"



async function fetchCollection() {
    try {
      const response = await fetch(`${base_url}/groups/${group_id}/items/top`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(JSON.stringify(json));
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

function renderItem(item){
  console.log(item.data.title);
  function extractDomain(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?([^.\/]+\.[^.\/]+).*$/, "$1");
  }  
  return `
  <div class="min-vh-100 d-flex paper">  
  <div class = "w-75 mx-auto my-auto p-5 bg-light text-dark rounded">
      <div class = "row">
          <div class = "col-8">
            <div class="paper-header">
                <h2 class = "title">${item.data.title}</h2>
                <div class="authors">
                  <p class = "text-body-secondary" >${item.data.creators.map(object => object["firstName"] + " " + object["lastName"]).join(", ")}</p>
                  <p>Published in ${item.data.publicationTitle}</p>
                </div>
                <p class = "abstract">${item.data.abstractNote}</p>
                <div class = "key-insights">
                </div>
                <hr>
                <div class = "metadata row position-relative">
                <div class = "col"> <p>Published ${item.data.date}</p></div>
                <div class = "col"></div>
                <div class = "col"> <a class="btn btn-primary btn-lg  me-4 end-0 position-absolute" target="_blank" href="${item.data.url}" role="button">Read more</a></div>
                </div>
            </div>
          </div>
          <div class = "col">
            <h2>Key Insights</h2>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
              <li class="list-group-item">A fourth item</li>
              <li class="list-group-item">And a fifth one</li>
            </ul>
          </div>
        </div>
    </div>
    </div>
    `
}

function renderCollection(collection){
  const container = document.getElementById('container');
  collection.forEach(function(item){
    const paperCard = document.createElement('div');
    paperCard.innerHTML = renderItem(item)
    container.appendChild(paperCard)
  })  
}


fetchCollection().then(
  function(value){
    collection = value
    renderCollection(collection)
  },
  function(error){console.error(error.message);}
)






  