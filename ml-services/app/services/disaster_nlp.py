def analyze_disaster_text(data: dict):
    text = data.get("text", "").strip()

    if not text:
        return {
            "status": "error",
            "message": "Text is required",
        }

    keywords = [
        "flood",
        "earthquake",
        "landslide",
        "cyclone",
        "drought",
        "fire",
    ]

    detected_hazards = [
        keyword
        for keyword in keywords
        if keyword.lower() in text.lower()
    ]

    return {
        "text": text,
        "detected_hazards": detected_hazards,
        "hazard_count": len(detected_hazards),
    }