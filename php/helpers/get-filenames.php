<?php
    function get_proper_image_filenames($parameter) {
        return preg_match("/.jpg$/", $parameter);
    }

    $images_directory = realpath(".")."/images/";
    $image_filenames = scandir($images_directory);
    $proper_image_filenames = array_filter(
        $image_filenames,
        "get_proper_image_filenames"
    );
    echo json_encode(
        array_values($proper_image_filenames)
    );
?>