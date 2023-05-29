document.addEventListener('DOMContentLoaded', function() {
  // 获取保存的价格
  chrome.storage.sync.get('price', function(data) {
    var price = data.price;
    if (price) {
      document.getElementById('priceInput').value = price;
    }
  });

  // 保存按钮点击事件
  document.getElementById('saveButton').addEventListener('click', function() {
    var price = document.getElementById('priceInput').value;
    chrome.storage.sync.set({ 'price': price });
  });

  // USD输入框变化事件
  document.getElementById('usdInput').addEventListener('input', function() {
    var usd = parseFloat(document.getElementById('usdInput').value);
    var price = parseFloat(document.getElementById('priceInput').value);
    if (!isNaN(usd) && !isNaN(price)) {
      var btc = usd / price;
      var sats = btc * 100000000;
      document.getElementById('btcInput').value = btc.toFixed(8);
      document.getElementById('satsInput').value = sats.toFixed(2);
    }
  });

  // SATS输入框变化事件
  document.getElementById('satsInput').addEventListener('input', function() {
    var sats = parseFloat(document.getElementById('satsInput').value);
    var price = parseFloat(document.getElementById('priceInput').value);
    if (!isNaN(sats) && !isNaN(price)) {
      var btc = sats / 100000000;
      var usd = btc * price;
      document.getElementById('btcInput').value = btc.toFixed(8);
      document.getElementById('usdInput').value = usd.toFixed(4);
    }
  });

  // BTC输入框变化事件
  document.getElementById('btcInput').addEventListener('input', function() {
    var btc = parseFloat(document.getElementById('btcInput').value);
    var price = parseFloat(document.getElementById('priceInput').value);
    if (!isNaN(btc) && !isNaN(price)) {
      var sats = btc * 100000000;
      var usd = btc * price;
      document.getElementById('satsInput').value = sats.toFixed(2);
      document.getElementById('usdInput').value = usd.toFixed(4);
    }
  });

  // 清除所有输入框内容
  document.getElementById('usdInput').addEventListener('click', clearInputs);
  document.getElementById('satsInput').addEventListener('click', clearInputs);
  document.getElementById('btcInput').addEventListener('click', clearInputs);

  function clearInputs() {
    document.getElementById('usdInput').value = '';
    document.getElementById('satsInput').value = '';
    document.getElementById('btcInput').value = '';
  }
});
