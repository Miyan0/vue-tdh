# Notes for rapports

## General Requirements

1. display list of last lot
2. display detail for selected rapport
3. update selected rapport
4. delete selected rapport

---
## Specific requirements

## List display

#### Data exposed:

- no lot
- no cause
- full address
- demarche date
- procedure type
- secteur

#### Operations allowed:

Show entries

 - default -> last lot
 - allow show all (for small sets) -> hide paging widgets
 - allow searching by
  - no lot
  - no cause
  - date demarche
  - secteur
  - address
 
 - allow ordering by
  - no lot
  - date/time demarche
  - address
  - secteur

Select entries

 - when selecting one entry
  - display detail
 
 - when selecting many entries
  - hide detail
  - can show subset of selected entries
  - can omit subset from displayed entries
  - can print selected entries
  - can print all non-printed entries
  - can delete selected entries
  - can update common fields for selected entries

## Detail display

Add entries

 - automatic copying infos from last entry on saving
 - smart date, time entries
 - on entering no civique or rue, fetch address infos
  - auto correct rue
  - notify user for errors
    - rue not found
    - rue found but wrong no civique
  - ville, km, secteur
 - allow copying infos from any entry
  - user show detail from a particular entry and click on button to copy

Update/display entry
  - user must choose between display and update (button)
  - allow navigation (first, prev, next, last)
  - allow deletion
  - allow printing


## Data structure

Since we allow multiple selection, we need a new data structure for holding
many records. This should avoid duplications.
 
