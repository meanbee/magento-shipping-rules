<?php
class Meanbee_Shippingrules_Helper_Import extends Mage_Core_Helper_Abstract {

    protected static $_IMPORT_IGNORE_COLUMNS = array(
        'rule_id'
    );

    protected static $_BASE64_COLUMNS = array(
        'conditions_serialized'
    );

    /**
     * @param $filename
     *
     * @return bool
     */
    public function importRulesFromFile($filename) {

        $csv_handler = new Varien_File_Csv();
        $csv_data = $csv_handler->getData($filename);

        if (count($csv_data) > 1) {
            $column_names_row = $csv_data[0];

            for ($i = 1; $i < count($csv_data); $i++) {
                $current_row = $csv_data[$i];

                $rule = Mage::getModel('meanship/rule');

                foreach ($column_names_row as $column_idx => $column_name) {

                    if (in_array($column_name, self::$_IMPORT_IGNORE_COLUMNS)) {
                        continue;
                    }

                    $column_value = $current_row[$column_idx];
                    $decoded_value = $this->decodeValue($column_name, $column_value);

                    $rule->setData($column_name, $decoded_value);
                }

                $rule->save();
            }
        } else if (count($csv_data) == 1) {
            Mage::throwException("File contained no rules!");
        } else {
            Mage::throwException("File was empty!");
    }

        return true;
    }

    public function decodeValue($column_name, $column_value) {
        if (in_array($column_name, self::$_BASE64_COLUMNS)) {
            return base64_decode($column_value);
        }

        return $column_value;
    }
}
