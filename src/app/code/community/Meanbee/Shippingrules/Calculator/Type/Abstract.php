<?php
abstract class Meanbee_Shippingrules_Calculator_Type_Abstract
{
    private $comparators = array();

    public function __construct($registers) {
        $this->registers = $registers;
    }

    /**
     * Adds an association to a comparator that can handle this type.
     * @param  string $comparatorID
     * @return $this
     */
    public function addComparator($comparatorID)
    {
        if (!$this->canBeHandledByComparator($comparatorID, false)) {
            array_push($this->comparators, $comparatorID);
        }
        return $this;
    }

    /**
     * Removes an association with a comparator..
     * @todo
     * @param  string  $comparatorID
     * @param  boolean $bidi         Should it also remove the reverse association.
     * @return $this
     */
    public function removeComparator($comparatorID, $bidi = true)
    {
        if ($this->canBeHandledByComparator($comparatorID, $bidi)) {
            $this->comparators = array_diff($this->comparators, [$comparatorID]);
            if ($bidi) {
                $comparator = $this->registers->getComparatorRegister()->get($comparatorID);
                $typeID = $this->registers->getTypeRegister()->find($this);
                $comparator->removeType($typeID, false);
            }
        }
        return $this;
    }

    /**
     * Checks whether the type can be handled by the comparator.
     * @todo
     * @param  string  $comparatorID
     * @param  boolean $bidi         Should the reverse association also be checked.
     * @return boolean
     */
    public function canBeHandledByComparator($comparatorID, $bidi = true)
    {
        if (in_array($comparatorID, $this->comparators)) {
            return true;
        }
        if ($bidi) {
            $typeID = $this->registers->getTypeRegister()->find($this);
            return $this->registers->getComparatorRegister()->get($comparatorID)->canHandleType($typeID, false);
        }
        return false;
    }

    public function sanitizeValidValue($value)
    {
        return $value;
    }

    public function sanitizeVariableValue($value)
    {
        return $value;
    }
}
