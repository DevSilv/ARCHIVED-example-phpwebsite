<!doctype html>
<html lang="en">

<head>
    <title>A simple image slider</title>
    <?php require 'commons/head-commons.php'; ?>
    <link rel="stylesheet" href="../css/image-slider.css" />
    <script src="../js/image-slider-helpers.js"></script>
    <script src="../js/image-slider.js"></script>
</head>

<body>
    <div class="wrapper">
        <?php require 'commons/main-header-en.php'; ?>
        <?php require 'commons/main-menu-en.php'; ?>
        <main class="content">
            <article>
                <h1 class="heading content__heading">A simple image slider</h1>
                <div class="content__body">
                    <figure class="image-slider">
                        <div class="image-slider__buttons-wrapper">
                            <button type="button" class="image-slider__button image-slider__prev-button">Previous</button>
                            <button type="button" class="image-slider__button image-slider__next-button">Next</button>
                        </div>
                        <figcaption class="image-slider__caption">
                        </figcaption>
                        <img srcset="../images/desktop-300.jpg 1x" src="../images/desktop-300.jpg" class="image-slider__image" alt="Random photo" />
                    </figure>
                </div>
            </article>
        </main>
        <?php require 'commons/main-footer-en.php'; ?>
    </div>
</body>

</html>