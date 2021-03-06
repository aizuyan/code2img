# code2img
将代码文件转化为图片

## 安装

请使用最新版本的node。

```shell
# 克隆仓库
git clone https://github.com/aizuyan/code2img.git
cd code2img

# 安装依赖库
npm install

#可执行文件+x
chmod +x code2img
```

## 使用
`--file`后面的参数是要转换的文件，`--style`后面的参数是颜色主题，可选，
有默认值，`--language`后面的是语言，默认根据后缀名截取，可选。

```
./code2img --file=/path/to/file [--style=github] [--language=php]
```

其中，style样式列表可选如下文件名（不包含后缀），着来自于
![highlight.js](https://github.com/isagalaev/highlight.js/tree/master/src/styles)
[样式列表](./assets/styles.png)

#### 例子
```
./code2img --file=img2ascii/src/Image2Ascii.php --style=github
```
原始代码
```php
<?php
/**
 *                       ::                              ::
 *                     :;J7, :,                        ::;7:
 *                     ,ivYi, ,                       ;LLLFS:
 *                     :iv7Yi                       :7ri;j5PL
 *                    ,:ivYLvr                    ,ivrrirrY2X,
 *                    :;r@Wwz.7r:                :ivu@kexianli.
 *                   :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                  ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *               ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *             :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *            ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *          :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *         ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *       ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *       :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *      ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *     ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *    ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *   :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *   ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *   i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *   :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *   i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *   :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *   :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *    :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *         , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *             :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *          ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *          ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *       , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *        :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 *
 * 
 *          Doge bless you!
 *          No bug!
 *
 * @Author 燕睿涛<ritoyan@163.com>
 * @Date
 * @Desc
 */
namespace Aizuyan\Image2Ascii;

class Image2Ascii
{
    protected $target;

    // 图片资源
    protected $resourceImage = null;

    // 灰度最小值
    protected $grayMin;

    // grayAsciiMap 中每类型所包含的灰度差大小
    protected $mapChunk;

    // ImageCreate object
    protected $imageObj;

    // PixelHandle object
    protected $pixelObj;

    protected $asciis = ".`:-,;\"_~!^ir |/I=<>*l1t+j
    ?v\)(Lf{7}
    JTcxz]
    [unsYoFy
    e2aVk3h
    ZC4P5A
    qXpE%0U
    db6KS9#HwG\$OgD8RQmB&NWM@";
    protected $grayAsciiMap = [
        ["$", "&", "N", "W", "M", "@"],
        ["$", "&", "N", "W", "M", "@"],
        ["$", "&", "N", "W", "M", "@"],
        ["O", "g", "D", "8", "R", "Q", "m", "B"],
        ["O", "g", "D", "8", "R", "Q", "m", "B"],
        ["O", "g", "D", "8", "R", "Q", "m", "B"],
        ["@", "B", "B", "0", "0", "8", "8"],
        ["@", "B", "B", "0", "0", "8", "8"],
        ["@", "B", "B", "0", "0", "8", "8"],
        ["9", "0", "M", "N"],
        ["9", "0", "M", "N"],
        ["9", "0", "M", "N"],
        ["q", "X", "p", "E", "%", "0", "U"],
        ["Z", "C", "4", "P", "5", "A"],
        ["e", "2", "a", "V", "k", "3", "h"],
        ["[", "u", "n", "s", "Y", "o", "F", "y"],
        ["J", "T", "c", "x", "z", "]"],
        ["?", "v", "f", "{", "7", "}"],
        ["|", "/", "I", "=", "<", ">", "*", "l", "1", "t", "+", "j"],
        ["|", "/", "I", "=", "<", ">", "*", "l", "1", "t", "+", "j"],
        ["|", "/", "I", "=", "<", ">", "*", "l", "1", "t", "+", "j"],
        ["|", "/", "I", "=", "<", ">", "*", "l", "1", "t", "+", "j"],
        [".", "`", ":", "-", ",", ";"],
        [".", "`", ":", "-", ",", ";"],
        [".", "`", ":", "-", ",", ";"],
        ["\"", "_", "~", "!", "^", "i", "r"],
        ["\"", "_", "~", "!", "^", "i", "r"],
        ["\"", "_", "~", "!", "^", "i", "r"],
        [" ", ","],
        [" ", ","],
        [" ", ","],
        [" ", ","],
        [" ", ","],
        [" ", ","],
        [" ", " ", ","],
        [" ", " ", ","],
        [" ", " ", ","],
        [" ", " ", ","],
        [" ", " ", ","],
        [" ", " ", ","],
        [" ", "."],
        [" ", "."],
        [" ", " ", "."],
        [" ", " ", "."],
        [" ", " ", "."],
        [" ", " ", "."],
        [" "],
        [" "],
        [" "],
        [" "],
    ];


    public function __construct($target)
    {
        $this->target = $target;
    }

    public function createImage()
    {
        $this->imageObj = new ImageCreate($this->target);
        $this->resourceImage = $this->imageObj->create();

        return $this;
    }

    public function scale($scaleX, $scaleY)
    {
        $this->pixelObj->scale($scaleX, $scaleY);

        return $this;
    }

    public function createPixel()
    {
        $this->pixelObj = (new PixelHandle($this->resourceImage))->handle();
        $this->grayMin = $this->pixelObj->grayMin();
        $grayGap = $this->pixelObj->grayGap();
        $this->mapChunk = ceil($grayGap / (count($this->grayAsciiMap) - 1));

        return $this;
    }

    public function out()
    {
        $result = $this->pixelObj->out();
        $ret = "";
        $topBorder = false;
        foreach ($result as $pixelChunk) {
            if (empty($topBorder)) {
                $topBorder = true;
                $ret .= "*";
                for ($i = 1; $i <= count($pixelChunk); $i++) {
                    $ret .= "-";
                }
                $ret .= "*\n";
            }
            $ret .= "|";
            foreach ($pixelChunk as $pixel) {
                $ret .= $this->gray2Ascii($pixel - $this->grayMin);
            }
            $ret .= "|";
            $ret .= "\n";
        }
        $ret .= "*";
        for ($i = 1; $i <= count($pixelChunk); $i++) {
            $ret .= "-";
        }
        $ret .= "*\n";

        return $ret;
    }

    protected function gray2Ascii($gray)
    {
        $index = floor($gray / $this->mapChunk);
        return $this->grayAsciiMap[$index][array_rand($this->grayAsciiMap[$index])];
    }
}
```

转化之后的图片
![转化之后的图片](./assets/example-php.png)

```
./code2img --file=img2ascii/src/Image2Ascii.php --style=solarized-light
```
![转化之后的图片](./assets/example-php-solarized.png)

shell脚本转化之后：
![](./assets/example-sh.png)
