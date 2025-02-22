import json

# 原始歌词文本
lyrics_text = """
██████も言えないこんな世の中じゃ
█の盃を呷ったほうがマシだね
そしてクオリアを持った███として蘇り
██切れなかった夜をくべる
451度じゃ燃やし尽くせない輝きを見たくて
アルファベットな僕ら綴るのさ言葉取り戻すため

星空の見えない地球発4時のニュース
ピークレベルを超えた脳の寄生を今祓う
刹那█後 2週間███かけた身体が目を覚まし
液化したピアノと夜を明かす

黄泉に行ってなお生まれ変
わり続ける言の霊に託して
僕は叫ぶのさこの黒塗りの世界の裏各地へ

█ぬも█むも██いも█くも愛す
█かれた█違いの██の詩
██に█き██され█った言葉を
██った█れ者が██してく
██以外█んで██った██溜めで
██も██も██も伝えられなきゃ
█んでも█んでも██切れないから
世界に送る黒塗りのラブレター
"""

lyrics_lines = [line.strip() for line in lyrics_text.splitlines() if line.strip()]

beats_per_line = 16
lyrics_json = [{"text": line, "beats": beats_per_line} for line in lyrics_lines]

json_output = json.dumps(lyrics_json, indent=2, ensure_ascii=False)
print(json_output)
