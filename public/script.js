$(".create-comment").validate({
    rules: {
        fullname: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i
        },
        email: {
            required: true,
            email: true
        },
        description: {
            required: true,

        },

    },

    messages: {
        fullname: {
            required: 'Vui lòng nhập họ tên',
            maxlength: 'Vui lòng nhập email',
            regex: 'Vui lòng không nhập số hoặc ký tự đặc biệt'
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'vui lòng nhập đúng định dạng email. vd: avx@gmail.com'
        },
        description: {
            required: 'Vui lòng nhập nội dung',
        },

    },

    // jquery validation hỗ trợ cái anyf
    submitHandler: function (form) {
        // alert(typeof $(form).serialize())
        $('.message').show();
        $('.message').html('<i class="fas fa-spinner fa-spin"></i> Hệ thống đang lưu gửi bình luận, vui lòng chờ ...');
        $.ajax({
            type: "POST",
            url: "/san-pham/store-comment",
            data: $(form).serialize(),
            success: function (response) {
                // alert(response);
                $('.review-item').html(response);
                $('.create-comment')[0].reset();
                $('.message').hide();
            }
        });
    },


});