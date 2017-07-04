const placementTypes = {
    Weekly : 0,
    Monthly : 1
}
export default function getPlacementType(placementType) {
    return placementTypes[placementType]
}