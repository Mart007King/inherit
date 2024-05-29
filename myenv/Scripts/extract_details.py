import sys
import json
from pdfminer.high_level import extract_text as extract_text_from_pdf
import docx

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_details(text):
    import spacy
    nlp = spacy.load("en_core_web_sm")
    
    # Initialize empty details dictionary to store extracted information
    details = {
        "name": None,
        "email": None,
        "phone": None,
        "education": [],
        "experience": []
    }
    
    # Process text using spaCy
    doc = nlp(text)
    
    # Loop through entities extracted by spaCy
    for ent in doc.ents:
        # Check entity label and extract relevant information
        if ent.label_ == "PERSON":
            details["name"] = ent.text
        elif ent.label_ == "EMAIL":
            details["email"] = ent.text
        elif ent.label_ == "PHONE":
            details["phone"] = ent.text
        elif ent.label_ == "ORG":
            details["experience"].append(ent.text)
        elif ent.label_ in ["DATE", "TIME", "GPE"]:
            details["education"].append(ent.text)
    
    return details

if __name__ == "__main__":
    # Get file path from command line argument
    file_path = sys.argv[1]
    
    # Extract text from PDF or DOCX file based on file extension
    if file_path.endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        text = extract_text_from_docx(file_path)
    else:
        text = ""
    
    # Extract details from extracted text
    details = extract_details(text)
    
    # Print extracted details as JSON
    print(json.dumps(details))
