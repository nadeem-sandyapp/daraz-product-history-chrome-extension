
  // get current tab url
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
  }, function(tabs) {
      // and use that tab to fill in out title and url
      var tab = tabs[0];
      var url = new URL(tab.url)
      var domain = url.hostname;
      if(domain == "www.daraz.pk"){
        var base = "https://comparepk.com/public/daraz-tools/get-daraz-product-data-for-chrome-extension?url=";
        chrome.runtime.onMessage.addListener(function(request, sender) {
          loadXMLDoc(base+tab.url);
          // if (request.action == "getSource") {
          //   data.innerHTML += "<h4><a href='"+base+tab.url+"' target='_blank'>"+request.source.data.root.fields.product.title+"</a></h4>";
          //   data.innerHTML += "<span>"+request.source.data.root.fields.product.brand.name+", </span>";
          //   data.innerHTML += "<span>Rating: "+request.source.data.root.fields.product.rating.score+" / </span>";
          //   data.innerHTML += "<span>"+request.source.data.root.fields.product.rating.total+", </span>";
          //   data.innerHTML += "<span>Stock: "+request.source.data.root.fields.skuInfos[0].stock+", </span>";
          //   data.innerHTML += "<span>Price: "+request.source.data.root.fields.skuInfos[0].price.salePrice.value+"</span>";
          //   data.innerHTML += "<a href='"+base+tab.url+"' target='_blank'><img style='max-width: 100%' src="+request.source.data.root.fields.skuInfos[0].image+" /></a>";
          //   data.innerHTML += "<span>All Data: "+request.source.data.root.fields.product.desc+"</span>";
          // }
        });
      }
      else{
        document.getElementById("message").innerHTML = "This product hunting tool is only for daraz.pk";
      }
    });
  


  function onWindowLoad() {
  
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  }

  function loadXMLDoc(url) {
    console.log("URL:"+url);
    document.getElementById('status').innerHTML = "<h1 style='color:blue;'>Collecting...</h1>";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('status').innerHTML = "<span>"+this.responseText+"</span>";
        }
    };
}
  
  window.onload = onWindowLoad;