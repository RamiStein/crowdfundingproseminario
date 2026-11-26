import os
import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Paths
INPUT_IMAGE_PATH = r"C:/Users/Rami/.gemini/antigravity/brain/6dc96189-ad79-439d-af56-abee59596fa8/.user_uploaded/media_1795730593274_deef3ad1.jpg"
FONT_SERIF_BOLD = "fonts_flyer/CormorantGaramond-Bold.ttf"
FONT_SERIF_MED = "fonts_flyer/CormorantGaramond-SemiBold.ttf"
FONT_SANS_BOLD = "fonts_flyer/PlusJakartaSans-Bold.ttf"
FONT_SANS_MED = "fonts_flyer/PlusJakartaSans-Medium.ttf"

BG_COLOR = (18, 13, 10, 255)
GOLD_PRIMARY = (229, 192, 123)
GOLD_MUTED = (195, 155, 95)
TEXT_WHITE = (255, 250, 242)
TEXT_MUTED = (195, 180, 165)
GREEN_ACCENT = (190, 230, 190)

def create_qr(data, size=210):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=8,
        border=1,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#26170d", back_color="#faf6f0").convert("RGBA")
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    
    # Add rounded corners & delicate border
    mask = Image.new("L", (size, size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.rounded_rectangle([(0, 0), (size, size)], radius=18, fill=255)
    
    rounded_qr = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    rounded_qr.paste(img, (0, 0), mask=mask)
    
    bordered = Image.new("RGBA", (size + 4, size + 4), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(bordered)
    b_draw.rounded_rectangle([(0, 0), (size + 3, size + 3)], radius=20, outline=(218, 175, 95, 210), width=2)
    bordered.paste(rounded_qr, (2, 2), mask=mask)
    return bordered

def draw_text_with_shadow(draw, pos, text, font, fill, shadow_fill=(10, 7, 5, 220), offset=(2, 2)):
    x, y = pos
    ox, oy = offset
    draw.text((x + ox, y + oy), text, font=font, fill=shadow_fill)
    draw.text((x, y), text, font=font, fill=fill)

def draw_pill(draw, xy, text, font, bg=(45, 32, 22, 240), outline=(218, 175, 95, 180), text_color=GOLD_PRIMARY, padding=(14, 5)):
    x, y = xy
    px, py = padding
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    w = tw + px * 2
    h = th + py * 2
    
    draw.rounded_rectangle([(x, y), (x + w, y + h)], radius=h//2, fill=bg, outline=outline, width=1)
    # text center
    draw.text((x + px - bbox[0], y + py - bbox[1]), text, font=font, fill=text_color)
    return w, h

def generate_vertical_story():
    """Format: 1080 x 1920 (WhatsApp Status / Instagram Story / 9:16)"""
    WIDTH, HEIGHT = 1080, 1920
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), BG_COLOR)
    
    # 1. Base artwork placement
    art = Image.open(INPUT_IMAGE_PATH).convert("RGBA")
    art_w = 1080
    art_h = int(art.height * (art_w / art.width)) # 810
    art_resized = art.resize((art_w, art_h), Image.Resampling.LANCZOS)
    
    art_y = 160
    canvas.paste(art_resized, (0, art_y))
    
    # Top blend (y=0 to y=art_y+130)
    fade_top_len = art_y + 130
    fade_top = Image.new("RGBA", (WIDTH, fade_top_len), (0, 0, 0, 0))
    d_top = ImageDraw.Draw(fade_top)
    for y in range(fade_top_len):
        alpha = int(255 * (1.0 - (y / fade_top_len)**1.3))
        d_top.line([(0, y), (WIDTH, y)], fill=(18, 13, 10, alpha))
    canvas.alpha_composite(fade_top, (0, 0))
    
    # Bottom blend (from y=art_y+art_h-240 to HEIGHT)
    fade_start = art_y + art_h - 220
    fade_len = HEIGHT - fade_start
    fade_bottom = Image.new("RGBA", (WIDTH, fade_len), (0, 0, 0, 0))
    d_bot = ImageDraw.Draw(fade_bottom)
    for y in range(fade_len):
        alpha = int(255 * min(1.0, (y / (fade_len * 0.40))**1.1))
        d_bot.line([(0, y), (WIDTH, y)], fill=(18, 13, 10, alpha))
    canvas.alpha_composite(fade_bottom, (0, fade_start))
    
    # Delicate shadow overlay on the left side so text reads effortlessly against starry stardust
    side_fade = Image.new("RGBA", (660, art_h), (0, 0, 0, 0))
    d_side = ImageDraw.Draw(side_fade)
    for x in range(660):
        alpha = int(175 * (1.0 - (x / 660)**1.4))
        d_side.line([(x, 0), (x, art_h)], fill=(18, 13, 10, alpha))
    canvas.alpha_composite(side_fade, (0, art_y))
    
    # Typography Setup
    draw = ImageDraw.Draw(canvas)
    
    font_sub_top = ImageFont.truetype(FONT_SANS_BOLD, 22)
    font_title_top = ImageFont.truetype(FONT_SERIF_BOLD, 48)
    font_badge = ImageFont.truetype(FONT_SANS_BOLD, 17)
    
    font_quote = ImageFont.truetype(FONT_SERIF_BOLD, 42)
    font_quote_sub = ImageFont.truetype(FONT_SERIF_MED, 28)
    
    font_sec_title = ImageFont.truetype(FONT_SANS_BOLD, 22)
    font_label = ImageFont.truetype(FONT_SANS_MED, 18)
    font_alias_large = ImageFont.truetype(FONT_SERIF_BOLD, 36)
    font_desc = ImageFont.truetype(FONT_SANS_MED, 17)
    font_email = ImageFont.truetype(FONT_SANS_BOLD, 18)
    font_url = ImageFont.truetype(FONT_SANS_BOLD, 22)
    font_footer = ImageFont.truetype(FONT_SANS_MED, 16)
    
    # --- HEADER ---
    draw.text((WIDTH//2, 75), "COMUNIDAD DE CRISTIANOS", font=font_sub_top, fill=GOLD_PRIMARY, anchor="mm")
    draw.text((WIDTH//2, 125), "Proseminario Latinoamericano", font=font_title_top, fill=TEXT_WHITE, anchor="mm")
    draw.line([(WIDTH//2 - 120, 155), (WIDTH//2 + 120, 155)], fill=(195, 155, 95, 160), width=1)
    
    # --- ARTWORK ZONE (Negative starry space on the left) ---
    quote_y = 350
    draw_pill(draw, (80, quote_y), "CAMPAÑA SOLIDARIA 2027", font=font_badge, padding=(16, 6))
    
    quote_lines = [
        "«Cada contribución",
        "es una forma de",
        "hacer posible este",
        "camino sacramental»"
    ]
    qy = quote_y + 60
    for ql in quote_lines:
        draw_text_with_shadow(draw, (80, qy), ql, font_quote, fill=TEXT_WHITE, shadow_fill=(10, 7, 5, 230), offset=(2, 2))
        qy += 52
        
    draw_text_with_shadow(draw, (80, qy + 15), "Viaje de Inmersión en la Tierra", font=font_quote_sub, fill=(240, 215, 165))
    draw_text_with_shadow(draw, (80, qy + 50), "11 al 20 de Enero • Granja Épicos", font=font_quote_sub, fill=(215, 190, 150))
    
    # --- DONATION DETAILS SECTION (Clean, Minimal, High-Contrast) ---
    box_top = 1040
    draw.text((WIDTH//2, box_top), "DATOS OFICIALES PARA COLABORAR", font=font_sec_title, fill=GOLD_PRIMARY, anchor="mm")
    draw.line([(WIDTH//2 - 160, box_top + 18), (WIDTH//2 + 160, box_top + 18)], fill=(180, 140, 75, 120), width=1)
    
    # Card 1: Pesos Argentinos
    c1_w = 920
    c1_h = 140
    cx = (WIDTH - c1_w) // 2
    c1_y = box_top + 45
    
    # Background pill card
    card_bg = Image.new("RGBA", (c1_w, c1_h), (32, 22, 16, 230))
    c_mask = Image.new("L", (c1_w, c1_h), 0)
    ImageDraw.Draw(c_mask).rounded_rectangle([(0, 0), (c1_w, c1_h)], radius=22, fill=255)
    c_border = Image.new("RGBA", (c1_w, c1_h), (0, 0, 0, 0))
    ImageDraw.Draw(c_border).rounded_rectangle([(0, 0), (c1_w - 1, c1_h - 1)], radius=22, outline=(195, 155, 95, 150), width=1)
    canvas.paste(card_bg, (cx, c1_y), mask=c_mask)
    canvas.alpha_composite(c_border, (cx, c1_y))
    
    # Content Card 1
    draw_pill(draw, (cx + 35, c1_y + 20), "ARGENTINA (ARS)", font=font_badge, bg=(55, 38, 25, 240), padding=(12, 4))
    draw.text((cx + 200, c1_y + 22), "Banco: Brubank • Caja de Ahorro", font=font_desc, fill=TEXT_MUTED)
    
    draw.text((cx + 35, c1_y + 66), "Alias en pesos:", font=font_label, fill=TEXT_MUTED)
    draw.text((cx + 175, c1_y + 58), "secretaria.rectoria", font=font_alias_large, fill=TEXT_WHITE)
    draw.text((cx + 35, c1_y + 104), "Titular de la cuenta: María Cecilia Fernanda Madero", font=font_desc, fill=(210, 195, 180))
    
    # Card 2: Dólares & Exterior
    c2_y = c1_y + c1_h + 16
    c2_h = 165
    
    card2_bg = Image.new("RGBA", (c1_w, c2_h), (32, 22, 16, 230))
    c2_mask = Image.new("L", (c1_w, c2_h), 0)
    ImageDraw.Draw(c2_mask).rounded_rectangle([(0, 0), (c1_w, c2_h)], radius=22, fill=255)
    c2_border = Image.new("RGBA", (c1_w, c2_h), (0, 0, 0, 0))
    ImageDraw.Draw(c2_border).rounded_rectangle([(0, 0), (c1_w - 1, c2_h - 1)], radius=22, outline=(195, 155, 95, 150), width=1)
    canvas.paste(card2_bg, (cx, c2_y), mask=c2_mask)
    canvas.alpha_composite(c2_border, (cx, c2_y))
    
    # Content Card 2
    draw_pill(draw, (cx + 35, c2_y + 20), "DÓLARES (USD)", font=font_badge, bg=(55, 38, 25, 240), padding=(12, 4))
    draw.text((cx + 185, c2_y + 24), "Alias USD:", font=font_label, fill=TEXT_MUTED)
    draw.text((cx + 280, c2_y + 18), "secretaria.rec.usd", font=font_alias_large, fill=TEXT_WHITE)
    
    draw_pill(draw, (cx + 35, c2_y + 72), "PAYPAL EXTERIOR", font=font_badge, bg=(55, 38, 25, 240), padding=(12, 4))
    draw.text((cx + 205, c2_y + 75), "proseminariolatinoamericano@comunidaddecristianos.org", font=font_email, fill=(245, 235, 220))
    
    # WhatsApp comprobante
    draw_pill(draw, (cx + 35, c2_y + 118), "COMPROBANTES", font=font_badge, bg=(28, 48, 30, 240), outline=(130, 190, 130, 180), text_color=GREEN_ACCENT, padding=(12, 4))
    draw.text((cx + 185, c2_y + 122), "Enviar por WhatsApp al:", font=font_label, fill=TEXT_MUTED)
    draw.text((cx + 380, c2_y + 120), "223 526 3962 (Gabriela)", font=ImageFont.truetype(FONT_SANS_BOLD, 18), fill=GREEN_ACCENT)
    
    # --- QR & OFFICIAL WEBSITE FOOTER ---
    qr_block_y = c2_y + c2_h + 30
    qr_img = create_qr("https://crowdfundingproseminario.vercel.app", size=180)
    qr_x = cx + 45
    canvas.alpha_composite(qr_img, (qr_x, qr_block_y))
    
    text_x = qr_x + 215
    draw.text((text_x, qr_block_y + 15), "WEB OFICIAL & CAMPAÑA EN VIVO", font=font_sec_title, fill=GOLD_PRIMARY)
    draw.text((text_x, qr_block_y + 48), "crowdfundingproseminario.vercel.app", font=font_url, fill=TEXT_WHITE)
    draw.text((text_x, qr_block_y + 88), "• Escaneá el código QR o ingresá directamente", font=font_desc, fill=TEXT_MUTED)
    draw.text((text_x, qr_block_y + 114), "• Conocé el proyecto y seguí la recaudación en vivo", font=font_desc, fill=TEXT_MUTED)
    draw.text((text_x, qr_block_y + 140), "• Información disponible en Español, Alemán y Portugués", font=font_desc, fill=TEXT_MUTED)
    
    # Bottom footnote
    draw.text((WIDTH//2, HEIGHT - 45), "Iniciativa de estudiantes del Proseminario de la Comunidad de Cristianos", font=font_footer, fill=(150, 135, 120), anchor="mm")
    
    out_rgb = canvas.convert("RGB")
    out_rgb.save("public/flyer-proseminario-vertical.jpg", "JPEG", quality=95)
    print("Vertical Story Flyer saved: public/flyer-proseminario-vertical.jpg")

def generate_square_post():
    """Format: 1080 x 1350 (Instagram Post / WhatsApp Chat Picture 4:5)"""
    WIDTH, HEIGHT = 1080, 1350
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), BG_COLOR)
    
    # 1. Base artwork
    art = Image.open(INPUT_IMAGE_PATH).convert("RGBA")
    art_w = 1080
    art_h = int(art.height * (art_w / art.width)) # 810
    art_resized = art.resize((art_w, art_h), Image.Resampling.LANCZOS)
    
    art_y = 100
    canvas.paste(art_resized, (0, art_y))
    
    # Top blend
    fade_top = Image.new("RGBA", (WIDTH, 170), (0, 0, 0, 0))
    d_top = ImageDraw.Draw(fade_top)
    for y in range(170):
        alpha = int(255 * (1.0 - (y / 170)**1.3))
        d_top.line([(0, y), (WIDTH, y)], fill=(18, 13, 10, alpha))
    canvas.alpha_composite(fade_top, (0, 0))
    
    # Bottom blend
    fade_start = art_y + art_h - 240
    fade_len = HEIGHT - fade_start
    fade_bottom = Image.new("RGBA", (WIDTH, fade_len), (0, 0, 0, 0))
    d_bot = ImageDraw.Draw(fade_bottom)
    for y in range(fade_len):
        alpha = int(255 * min(1.0, (y / (fade_len * 0.42))**1.1))
        d_bot.line([(0, y), (WIDTH, y)], fill=(18, 13, 10, alpha))
    canvas.alpha_composite(fade_bottom, (0, fade_start))
    
    # Subtle side shadow on left
    side_fade = Image.new("RGBA", (630, art_h), (0, 0, 0, 0))
    d_side = ImageDraw.Draw(side_fade)
    for x in range(630):
        alpha = int(175 * (1.0 - (x / 630)**1.4))
        d_side.line([(x, 0), (x, art_h)], fill=(18, 13, 10, alpha))
    canvas.alpha_composite(side_fade, (0, art_y))
    
    draw = ImageDraw.Draw(canvas)
    
    font_sub_top = ImageFont.truetype(FONT_SANS_BOLD, 20)
    font_title_top = ImageFont.truetype(FONT_SERIF_BOLD, 42)
    font_badge = ImageFont.truetype(FONT_SANS_BOLD, 15)
    
    font_quote = ImageFont.truetype(FONT_SERIF_BOLD, 36)
    font_quote_sub = ImageFont.truetype(FONT_SERIF_MED, 24)
    
    font_sec_title = ImageFont.truetype(FONT_SANS_BOLD, 20)
    font_label = ImageFont.truetype(FONT_SANS_MED, 16)
    font_alias_large = ImageFont.truetype(FONT_SERIF_BOLD, 32)
    font_desc = ImageFont.truetype(FONT_SANS_MED, 15)
    font_email = ImageFont.truetype(FONT_SANS_BOLD, 15)
    font_url = ImageFont.truetype(FONT_SANS_BOLD, 20)
    font_footer = ImageFont.truetype(FONT_SANS_MED, 15)
    
    # Header
    draw.text((WIDTH//2, 50), "COMUNIDAD DE CRISTIANOS", font=font_sub_top, fill=GOLD_PRIMARY, anchor="mm")
    draw.text((WIDTH//2, 92), "Proseminario Latinoamericano", font=font_title_top, fill=TEXT_WHITE, anchor="mm")
    
    # Quote
    qy = 240
    draw_pill(draw, (70, qy), "CAMPAÑA SOLIDARIA • INMERSIÓN 2027", font=font_badge, padding=(14, 5))
    quote_lines = [
        "«Cada contribución hace posible",
        "este camino formativo y sacramental»"
    ]
    qy += 45
    for ql in quote_lines:
        draw_text_with_shadow(draw, (70, qy), ql, font_quote, fill=TEXT_WHITE, shadow_fill=(10, 7, 5, 230), offset=(2, 2))
        qy += 44
    draw_text_with_shadow(draw, (70, qy + 10), "Granja Épicos • 11 al 20 de Enero", font=font_quote_sub, fill=(230, 205, 160))
    
    # Single Combined Modern Donation Card
    card_w = 950
    card_h = 365
    cx = (WIDTH - card_w) // 2
    cy = 735
    
    card_bg = Image.new("RGBA", (card_w, card_h), (30, 21, 15, 230))
    c_mask = Image.new("L", (card_w, card_h), 0)
    ImageDraw.Draw(c_mask).rounded_rectangle([(0, 0), (card_w, card_h)], radius=24, fill=255)
    c_border = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    ImageDraw.Draw(c_border).rounded_rectangle([(0, 0), (card_w - 1, card_h - 1)], radius=24, outline=(195, 155, 95, 150), width=1)
    canvas.paste(card_bg, (cx, cy), mask=c_mask)
    canvas.alpha_composite(c_border, (cx, cy))
    
    # Left Column: Banking details
    lx = cx + 35
    draw.text((lx, cy + 24), "¿CÓMO COLABORAR?", font=font_sec_title, fill=GOLD_PRIMARY)
    
    # ARS
    draw_pill(draw, (lx, cy + 62), "PESOS (ARS)", font=font_badge, bg=(50, 35, 24, 240), padding=(10, 3))
    draw.text((lx + 130, cy + 66), "Alias:", font=font_label, fill=TEXT_MUTED)
    draw.text((lx + 180, cy + 60), "secretaria.rectoria", font=font_alias_large, fill=TEXT_WHITE)
    draw.text((lx, cy + 106), "Banco: Brubank • Titular: María Cecilia Fernanda Madero", font=font_desc, fill=(195, 180, 165))
    
    # USD
    draw_pill(draw, (lx, cy + 144), "DÓLARES (USD)", font=font_badge, bg=(50, 35, 24, 240), padding=(10, 3))
    draw.text((lx + 145, cy + 148), "Alias USD:", font=font_label, fill=TEXT_MUTED)
    draw.text((lx + 235, cy + 142), "secretaria.rec.usd", font=font_alias_large, fill=TEXT_WHITE)
    
    # PayPal
    draw_pill(draw, (lx, cy + 204), "PAYPAL", font=font_badge, bg=(50, 35, 24, 240), padding=(10, 3))
    draw.text((lx + 90, cy + 208), "proseminariolatinoamericano@comunidaddecristianos.org", font=font_email, fill=(240, 230, 215))
    
    # Comprobantes WhatsApp
    draw_pill(draw, (lx, cy + 258), "COMPROBANTES", font=font_badge, bg=(26, 45, 28, 240), outline=(130, 190, 130, 180), text_color=GREEN_ACCENT, padding=(10, 3))
    draw.text((lx + 150, cy + 262), "WhatsApp:", font=font_label, fill=TEXT_MUTED)
    draw.text((lx + 240, cy + 260), "223 526 3962 (Gabriela)", font=ImageFont.truetype(FONT_SANS_BOLD, 17), fill=GREEN_ACCENT)
    
    # Vertical line separator
    div_x = cx + 675
    draw.line([(div_x, cy + 28), (div_x, cy + card_h - 28)], fill=(180, 140, 80, 90), width=1)
    
    # Right Column: QR Code & Call to Action
    qr_img = create_qr("https://crowdfundingproseminario.vercel.app", size=180)
    qr_x = div_x + 38
    qr_y = cy + 42
    canvas.alpha_composite(qr_img, (qr_x, qr_y))
    
    draw.text((qr_x + 90, qr_y + 208), "ESCANEA PARA DONAR", font=ImageFont.truetype(FONT_SANS_BOLD, 13), fill=GOLD_PRIMARY, anchor="mm")
    draw.text((qr_x + 90, qr_y + 232), "Web y contador en vivo", font=ImageFont.truetype(FONT_SANS_MED, 13), fill=TEXT_MUTED, anchor="mm")
    draw.text((qr_x + 90, qr_y + 252), "Info en ES • DE • PT", font=ImageFont.truetype(FONT_SANS_MED, 12), fill=(160, 145, 130), anchor="mm")
    
    # Footer
    draw.text((WIDTH//2, cy + card_h + 35), "Web oficial: crowdfundingproseminario.vercel.app", font=font_url, fill=TEXT_WHITE, anchor="mm")
    draw.text((WIDTH//2, HEIGHT - 35), "Grupo de Estudiantes del Proseminario de la Comunidad de Cristianos", font=font_footer, fill=(150, 135, 120), anchor="mm")
    
    out_rgb = canvas.convert("RGB")
    out_rgb.save("public/flyer-proseminario-post.jpg", "JPEG", quality=95)
    print("Post Flyer saved: public/flyer-proseminario-post.jpg")

if __name__ == "__main__":
    generate_vertical_story()
    generate_square_post()
