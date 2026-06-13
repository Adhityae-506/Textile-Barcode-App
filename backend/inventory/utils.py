from django.utils import timezone

def get_financial_year():

    today = timezone.now()

    if today.month >= 4:
        start_year = today.year % 100
        end_year = (today.year + 1) % 100
    else:
        start_year = (today.year - 1) % 100
        end_year = today.year % 100

    return f"{start_year:02d}/{end_year:02d}"