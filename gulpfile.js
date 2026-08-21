import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import newer from "gulp-newer";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import concat from "gulp-concat";
import browserSyncLib from "browser-sync";
import ssi from "gulp-ssi";
import esbuild from "gulp-esbuild"; // ✅ `esbuild` を追加
import webp from "gulp-webp"; // ✅ WebP変換用
import sourcemaps from "gulp-sourcemaps";

const browserSync = browserSyncLib.create();
const sass = gulpSass(dartSass);
const { src, dest, watch, series, parallel } = gulp;

// **SCSSコンパイル**
function styles() {
  return src("src/scss/style.scss", { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ["node_modules", "src/scss"] }).on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/css"))
    .pipe(browserSync.stream());
}

// **JSをバンドルして `main.min.js` に出力**
function scripts() {
  return src("src/js/main.js") // ✅ `main.js` をエントリーポイントにする
    .pipe(
      esbuild({
        bundle: true, // ✅ 依存関係をバンドル
        minify: true, // ✅ 圧縮
        sourcemap: true, // ✅ ソースマップを有効化
        target: "es6",
        outfile: "main.min.js",
        loader: { ".css": "text" }
      })
    )
    .pipe(dest("dist/assets/js")) // ✅ `dist/assets/js/` に出力
    .pipe(browserSync.stream());
}

// **画像圧縮**
function images() {
  return src("src/img/**/*")
    .pipe(newer("dist/assets/img"))
    .pipe(imagemin())
    .pipe(dest("dist/assets/img"));
}

// **WebPに変換**
function convertWebp() {
  return src("src/img/**/*.{jpg,jpeg,png}")
    .pipe(
      newer({
        dest: "dist/assets/img",
        ext: ".webp"
      })
    )
    .pipe(webp())
    .pipe(dest("dist/assets/img"));
}

// **HTMLコピー**
function html() {
  return src("src/html/**/*.html")
    .pipe(
      ssi({
        root: "src",     // ← virtual="/includes/xxx.html" の基準
        ext: ".html"     // 出力拡張子（ローカル用）
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

// audio コピー
function audio() {
  return src("src/audio/**/*")
    .pipe(dest("dist/assets/audio"));
}

// === WP連携: dist/assets → wp/assets を同期 ==================================
// 出力先（リポジトリ内の WordPress テーマ assets）
const WP_ASSETS = "wp/assets";

/**
 * **dist → wp 同期タスク**
 * - dist/assets に出力された成果物を、そのまま wp/assets 配下へコピー
 * - base を "dist/assets" に揃えることで、ディレクトリ構造を維持
 * - allowEmpty: 初回の dist が空でもエラーにしない
 */
function syncWp() {
  return src("dist/assets/**/*", { base: "dist/assets", allowEmpty: true })
    .pipe(dest(WP_ASSETS));
}
export { syncWp };


// **サーバー起動**
function serve() {
  browserSync.init({ server: { baseDir: "dist" } });

  // **SCSSコンパイル**
  watch("src/scss/**/*.scss", styles);

  // **JSバンドル**
  watch("src/js/**/*.js", scripts);

  // **画像圧縮 & WebP 生成**
  watch("src/img/**/*", series(images, convertWebp));

  // **HTMLコピー**
  watch("src/html/**/*.html", html);
  watch("src/includes/**/*.html", html);

  // **WP連携（重要）: distに何か出力されたら、即 wp/assets に同期**
  watch("dist/assets/**/*", syncWp);
}

// **タスクのエクスポート**
// 既存のエクスポートに追加
export { styles, scripts, images, convertWebp, html, audio, serve };

// default（開発用）タスク
// 1) dist を作る → 2) wp/assets に同期 → 3) サーバ起動 & 監視
export default series(
  parallel(styles, scripts, images, convertWebp, html, audio),
  syncWp,   // ★ dist → wp 同期
  serve
);

// build（本番用）タスク
// 1) dist を作る → 2) wp/assets に同期（サーバは起動しない）
export const build = series(
  styles, scripts, images, convertWebp, html, audio,
  syncWp    // ★ dist → wp 同期
);