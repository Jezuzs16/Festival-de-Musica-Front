import {src, dest, watch, series} from 'gulp'

import gulpSaas from 'gulp-sass'
import * as dartSass from 'sass'

const sass = gulpSaas(dartSass);  //Diciendole a sass que use gulpsass

export function js(done) {
    src('src/js/scripts.js')
        .pipe( dest('build/js'))
    done()
    
}
export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true}) //sourcemaps: true para que genere el archivo .map
        .pipe( sass().on('error', sass.logError))
        .pipe( dest('build/css', {sourcemaps: '.'}))
    
    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

export default series(js, css, dev) //Ejecuta las tareas en serie, la ultima es dev ya que es la que se va a ejecutar por defecto