function ready() {
  function upload_to_S3(file, uploadUrl, contentType, callbacks) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);
    xhr.setRequestHeader('Content-Type', contentType);

    xhr.onload = function(){
      if (xhr.status == 200)
        callbacks.success(file, uploadUrl.split('?')[0]);
      else
        callbacks.error(xhr);
    }

    xhr.onerror = function() {
      callbacks.error(xhr);
    }

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable)
        callbacks.onProgress(file, e.loaded);
    }

    xhr.send(file);
  }

  function add_attachment_to_custom_image(attachment) {
    var choice = '<li class="choice">' +
      '  <label for="product_default_image_id_'+ attachment.id +'">'+
      '    <input id="product_default_image_id_' + attachment.id + '" type="radio" value="' + attachment.id + '" name="product[default_image][id]">' +
      '    <img class="custom-image" src="'+ attachment.url +'" alt="'+ attachment.name +'">'+
      '  </label>'+
      '</li>';

    var default_image_container = $('.inputs.default_image');
    default_image_container.find('.choices-group').append(choice);
  }

  function save_attachment(productId, name, type, size, downloadUrl, success) {
    var url = '/admin/attachments';

    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: {
        attachment: {
          attachable_id: productId,
          attachable_type: 'Product',
          name: name,
          content_type: type,
          size: size,
          url: downloadUrl
        }
      },
      success: function(data) {
        add_attachment_to_custom_image(data);
      },
      error: function(xhr) {
        debugger;
      }
    })
  }


  function generate_upload_url(e) {
    var input = $(e.target);
    var file = e.target.files[0];

    return $.ajax({
      url:      '/api/uploads',
      method:     'POST',
      dataType: 'json',
      data: {
        upload: { filename: file.name }
      },
      success: function (data) {
        $('.input.loading').find('.label').text('Uploading...');

        upload_to_S3(file, data.upload.url, data.upload.content_type, {
          success: function(file, downloadUrl) {
            save_attachment($(input).data('product-id'), file.name, file.type, file.size, downloadUrl);
            $('.input.loading').hide();
            $('.input.loading').find('.label').text('Uploading...');
          },
          onProgress: function (file, lengthUploaded){
            $('.input.loading').show();
            $('.input.loading').find('.label').text('uploaded ' + lengthUploaded + ' of ' + file.size)
            console.log ('uploaded ' + lengthUploaded + ' of ' + file.size)
          },
          error: function (error){
            $('.input.loading').hide();
          }
        });
      }
    });
  }


  $('.product').on('change', '.custom_attachment', generate_upload_url)
}

$(document).ready(ready)
$(document).on('page:load', ready)
