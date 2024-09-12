$(document).ready(function () {

    // Clear the modal
    $('#ProductModal').on('hide.bs.modal', function () {
        // Reset form fields
        $('#ProductId').val('');
        $('#ProductName').val('');
        $('#Price').val('');
        $('#Qty').val('');

        // reset buttons 
        $('#Update').css('display', 'none');
        $('#Delete').css('display', 'none');
        $('#Save').css('display', 'block');

        // Make sure that fields are editable
        $('#ProductName').prop('readonly', false);
        $('#Price').prop('readonly', false);
        $('#Qty').prop('readonly', false);

        // Reset modal title
        $('#modalTitle').text('');
    })
    GetProducts();
});

function GetProducts() {
    $.ajax({
        url: '/product/GetProducts',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            let tableRows = '';

            if (response == null || response == undefined || response.length == 0) {
                tableRows = `
                    <tr>
                        <td class="text-center" colspan="5">No products available.</td>
                    </tr>`;
            }
            else {
                $.each(response, function (index, item) {
                    tableRows += `
                        <tr>
                            <td>${item.productId}</td>
                            <td>${item.productName}</td>
                            <td>${item.price}</td>
                            <td>${item.qty}</td>
                            <td>
                                <a href="#" class="btn btn-primary btn-sm" onclick="Edit(${item.productId});">Edit</a>
                                <a href="#" class="btn btn-danger btn-sm" onclick="DeleteModal(${item.productId});">Delete</a>
                            </td>
                        </tr>`;
                });
            }
            $('#tblBody').html(tableRows);
        },
        error: function () {
            alert('Unable to read data.');
        }
    });
}

// Add product button
$('#btnAdd').click(function () {
    $('#ProductModal').modal('show');
    $('#modalTitle').text('Add Product');
})



// Add product
function Insert() {
    let formData = new Object();
    formData.productId = $('#ProductId').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.qty = $('#Qty').val();

    formData.__RequestVerificationToken = $('input[name="__RequestVerificationToken"]').val();

    $.ajax({
        url: '/product/Insert',
        data: formData,
        type: 'POST',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to add product.');
            }
            else {
                GetProducts();
                alert('Product successfully added.');
                $('#ProductModal').modal('hide');
            }
        },
        error: function () {
            alert('An error occured.');
        }
    });
}

// Populate product detils in modal
function Edit(productId) {

    console.log(productId);
    $.ajax({
        url: 'product/Edit?id=' + productId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read data.');
            }
            else if (response.length == 0) {
                alert(`No data available for id: ${productId}`);
            }
            else {
                $('#ProductModal').modal('show');
                $('#productTitle').text('Update Product');
                $('#Save').css('display', 'none');
                $('#Delete').css('display', 'none');
                $('#Update').css('display', 'block');
                $('#ProductId').val(response.productId);
                $('#ProductName').val(response.productName);
                $('#Price').val(response.price);
                $('#Qty').val(response.qty);

                $('#ProductName').prop('readonly', false);
                $('#Price').prop('readonly', false);
                $('#Qty').prop('readonly', false);
            }
        },
        error: function () {
            alert('Unable to read data.');
        }
    });
}

function DeleteModal(productId) {
  //  console.log(productId);
    $.ajax({
        url: '/product/DeleteModal?id=' + productId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read data');
            }
            else if (response.length == 0) {
                alert(`No data available for id: ${productId}`);
            }
            else {
                $('#ProductModal').modal('show');
                $('#modalTitle').text('Delete Product');
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'none');
                $('#Delete').css('display', 'block');
                $('#ProductId').val(response.productId);
                $('#ProductName').val(response.productName);
                $('#ProductName').prop('readonly', true);
                $('#Price').val(response.price);
                $('#Price').prop('readonly', true);
                $('#Qty').val(response.qty);
                $('#Qty').prop('readonly', true);
            }
        },
        error: function () {
            alert('An error occurred while fetching the product details.');
        }
    });
}

function Update() {
    var token = $('input[name="__RequestVerificationToken"]').val();

    let formData = {
        __RequestVerificationToken: token,
        productId: $('#ProductId').val(),
        productName: $('#ProductName').val(),
        price: $('#Price').val(),
        qty: $('#Qty').val()
    };


    $.ajax({
        url: 'product/Update',
        data: formData,
        type: 'POST',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to update product');
            }
            else {
                GetProducts();
                alert('Product successfully updated.');
                $('#ProductModal').modal('hide');
            }
        },
        error: function () {
            alert('An error occured');
        }
    });
}

// Delete Product
function Delete() {
    var token = $('input[name="__RequestVerificationToken"]').val();

    let productId = $('#ProductId').val();


    $.ajax({
        url: 'product/Delete?id=' + productId,
        type: 'POST',
        data: {
            __RequestVerificationToken: token
        },
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to delete product');
            }
            else {
                GetProducts();
                alert('Product successfully deleted.');
                $('#ProductModal').modal('hide');
            }
        },
        error: function () {
            alert('An error occured');
        }
    });
}